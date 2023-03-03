import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { checkSession } from "../middlewares/checkSession";

const authRoute = Router();

const hashPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log("password :>> ", hashedPassword);
  return hashedPassword;
};

interface IUser {
  id: number;
  username: string;
  password: string;
  name: string;
}

const users: IUser[] = [
  {
    id: 1,
    username: "admin",
    password: "$2b$10$W4A3qXOQhPz.57mRKsxtcejy6nU5uA.S813Y.QJb2AF0VsKkp.E2q", // hashPassword("12345abc*"),
    name: "Admin User",
  },
];

authRoute.post("/login", (req: Request, res: Response) => {
  let { username, password } = req.body;
  console.log("password :>> ", password);
  let user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send("Username or password incorrect");
  }
  const passwordValid = bcrypt.compareSync(password, user.password);
  console.log("passwordValid :>> ", passwordValid);
  if (!passwordValid) {
    return res.status(401).send("Username or password incorrect");
  }
  const { ...respUser } = user;
  respUser.password = "**********";
  req.session.user = respUser;
  req.session._id =
    `$(req.sessionID)-` +
    Math.random().toString(36).substring(2, 20) +
    Math.random().toString(36) +
    Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
  console.log("req.session :>> ", req.session);
  res.json({ user: respUser, sessionId: req.sessionID });
});

authRoute.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({});
  });
});

authRoute.get("/me", checkSession, (req: Request, res: Response) => {
  res.json(req.session.user);
});

authRoute.post("/hash", (req: Request, res: Response) => {
  let { password } = req.query;
  let hashedPassword = hashPassword(password as string);
  res.json({ password: hashedPassword });
});

export default authRoute;
