import { NextFunction, Request, Response } from "express";

declare module "express-session" {
  interface SessionData {
    user?: any;
    _id?: string;
  }
}

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
