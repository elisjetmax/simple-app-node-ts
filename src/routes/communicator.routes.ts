import { Request, Response, Router } from "express";
import { CommunicatorServices } from "../services/communicator.services";
const config = require("../../config");

const communicatorRoutes = Router();
communicatorRoutes.post("/email", async (req: Request, res: Response) => {
  const mail = await new CommunicatorServices().mail(
    req.body.emailTo,
    req.body.subject,
    req.body.html
  );
  return res.json({ mail });
});

communicatorRoutes.post("/sms", async (req: Request, res: Response) => {
  const sms = await new CommunicatorServices().sms(
    req.body.phone,
    `${config.SMS_PREMESSAGE} ${req.body.message.toString()}`.substring(0, 160)
  );
  return res.json({ sms });
});

export default communicatorRoutes;
