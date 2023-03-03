import express, { Request, Response } from "express";
import session from "express-session";
import { checkSession } from "./middlewares/checkSession";
import authRoute from "./routes/auth";

const app = express();
const port: number = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoute);

app.get("/", checkSession, (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
