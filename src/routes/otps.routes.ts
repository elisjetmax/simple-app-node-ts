import { Request, Response, Router } from "express";
import { OtpsServices } from "../services/otps.services";
import { generateOTP } from "../utils/otp";

const otpsRoutes = Router();

otpsRoutes.post("/create", async (req: Request, res: Response) => {
  const dataOtp = {
    value: generateOTP(6),
    type: req.body.type || "email",
    isActive: true,
    expiresIn: 3600,
    userId: req.body.userId,
    channel: req.body.channel || "email",
  };
  let isCreated = (await new OtpsServices().create(dataOtp)) as any;
  if (isCreated === true) isCreated = { created: true };
  return res.json(isCreated);
});

export default otpsRoutes;
