"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const database_1 = require("./utils/database");
const package_json_1 = __importDefault(require("../package.json"));
const morgan_1 = __importDefault(require("morgan"));
const whiteLists_services_1 = require("./services/whiteLists.services");
const whiteLists_routers_1 = __importDefault(require("./routes/whiteLists.routers"));
const nodemailer_1 = require("./utils/nodemailer");
const loadtemplate_1 = require("./utils/loadtemplate");
const otps_routes_1 = __importDefault(require("./routes/otps.routes"));
const labsMobileSMS_1 = require("./extras/labsMobileSMS");
const communicator_routes_1 = __importDefault(require("./routes/communicator.routes"));
const customers_routes_1 = __importDefault(require("./routes/customers.routes"));
const partners_routes_1 = __importDefault(require("./routes/partners.routes"));
const credentials_routes_1 = __importDefault(require("./routes/credentials.routes"));
const config = require("../config");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, database_1.SessionEnabled)());
app.set("pkg", package_json_1.default);
app.use((0, morgan_1.default)("dev"));
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
(0, database_1.mongoConnect)((db) => __awaiter(void 0, void 0, void 0, function* () {
    yield new whiteLists_services_1.whiteListServices().init();
    const whiteList = (yield new whiteLists_services_1.whiteListServices().getAll());
    const IPs = (whiteList && whiteList.map((x) => x.IP)) || [];
    yield new whiteLists_services_1.whiteListServices().addToFilter(app, IPs);
}));
const allowlistCors = (_a = process.env.WHITELIST_CORS) === null || _a === void 0 ? void 0 : _a.split(",");
console.log("allowlistCors", allowlistCors);
const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    console.log("allowlistCors.indexOf(req.header(Origin))", allowlistCors === null || allowlistCors === void 0 ? void 0 : allowlistCors.indexOf(req.header("Origin")));
    if ((allowlistCors === null || allowlistCors === void 0 ? void 0 : allowlistCors.indexOf(req.header("Origin"))) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use((0, express_session_1.default)({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
}));
app.use("/auth", auth_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/communicator", communicator_routes_1.default);
app.use("/api/partners", partners_routes_1.default);
app.use("/api/customers", customers_routes_1.default);
app.use("/api/credentials", credentials_routes_1.default);
app.use("/api/otps", otps_routes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const _whiteListRoutes = yield new whiteLists_routers_1.default().routes(app);
    app.use("/api/whitelists", _whiteListRoutes);
}))();
app.get("/", (req, res) => {
    res.send(`SomosBow | ${app.get("pkg").version} | Todos los derechos reservados`);
});
app.get("/info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const html = yield new loadtemplate_1.LoadTemplate().getTemplate("generic.html");
    const r = yield new nodemailer_1.classMailer().sendEmail({
        emailTo: "elis.arcia@gmail.com",
        subject: "Esta es una prueba",
        html,
    });
    res.json(r);
}));
app.get("/sms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield new labsMobileSMS_1.LabsMobileSMS().send("+573052760458", "Esta es una prueba");
    res.json(r);
}));
app.listen(config.PORT, () => {
    console.log(`App listening at http://localhost:${config.PORT}`);
});
