import { Request, Response, Router } from "express";
import { userServices } from "../services/users.services";
import { IUserOutput } from "../types/users.types";
import { generateOTP } from "../utils/otp";

const usersRouters = Router();
usersRouters.post("/create", async (req: Request, res: Response) => {
  const userCreated = await new userServices().create({
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password || generateOTP(6),
    phone: req.body.phone || "",
  });

  const user: IUserOutput = userCreated as IUserOutput;
  return res.json({ ...user });
});

export default usersRouters;
