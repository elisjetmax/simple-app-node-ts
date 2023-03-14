import express from "express";
import session from "express-session";
import helmet from "helmet";
import authRoute from "./routes/auth";
import usersRouters from "./routes/users.routes";
import { mongoConnect, SessionEnabled } from "./utils/database";
import pkg from "../package.json";
import morgan from "morgan";
import { whiteListServices } from "./services/whiteLists.services";
import { IWhiteList } from "./types/whiteLists.types";
import whiteListRouters from "./routes/whiteLists.routers";
import { classMailer } from "./utils/nodemailer";
import { LoadTemplate } from "./utils/loadtemplate";
import otpsRoutes from "./routes/otps.routes";
import { LabsMobileSMS } from "./extras/labsMobileSMS";
import communicatorRoutes from "./routes/communicator.routes";
import customersRoutes from "./routes/customers.routes";
import partnersRoutes from "./routes/partners.routes";
import credentialsRoutes from "./routes/credentials.routes";
import { ICredentials } from "./types/credentials.types";
import mongoose from "mongoose";
import { afterEach } from "node:test";

const config = require("../config");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      credentials?: ICredentials;
    }
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(SessionEnabled());

app.set("pkg", pkg);
app.use(morgan("dev"));
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

mongoConnect(async (db: mongoose.Connection) => {
  await new whiteListServices().init();
  const whiteList = (await new whiteListServices().getAll()) as IWhiteList[];
  const IPs = (whiteList && whiteList.map((x: any) => x.IP)) || [];
  await new whiteListServices().addToFilter(app, IPs);
});

const allowlistCors = process.env.WHITELIST_CORS?.split(",");
console.log("allowlistCors", allowlistCors);

const corsOptionsDelegate = function (req: any, callback: any) {
  var corsOptions;
  console.log(
    "allowlistCors.indexOf(req.header(Origin))",
    allowlistCors?.indexOf(req.header("Origin"))
  );
  if (allowlistCors?.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoute);
app.use("/api/users", usersRouters);
app.use("/api/communicator", communicatorRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/credentials", credentialsRoutes);

app.use("/api/otps", otpsRoutes);
(async () => {
  const _whiteListRoutes = await new whiteListRouters().routes(app);
  app.use("/api/whitelists", _whiteListRoutes);
})();

app.get("/", (req, res) => {
  res.send(
    `SomosBow | ${app.get("pkg").version} | Todos los derechos reservados`
  );
});

app.get("/info", async (req, res) => {
  res.json({
    App: app.get("pkg").name,
    Descripcion: app.get("pkg").description,
    Version: app.get("pkg").version,
    Autor: app.get("pkg").author,
    Cors: allowlistCors,
    Context: config.NODE_ENV,
    FilterIP: config.USE_IPFILTER_MODULE,
    whiteList: config.WHITELIST_IPS ? config.WHITELIST_IPS.split(",") : null,
    filteredIpList: app.get("filteredIpList"),
  });
});

app.get("/send", async (req, res) => {
  const html = await new LoadTemplate().getTemplate("generic.html");
  const r = await new classMailer().sendEmail({
    emailTo: "elis.arcia@gmail.com",
    subject: "Esta es una prueba",
    html,
  });
  res.json(r);
});

app.get("/sms", async (req, res) => {
  const r = await new LabsMobileSMS().send(
    "+573052760458",
    "Esta es una prueba"
  );
  res.json(r);
});

app.listen(config.PORT, () => {
  console.log(`App listening at http://localhost:${config.PORT}`);
});
