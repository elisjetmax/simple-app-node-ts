import nodemailer from "nodemailer";
import { IEmail } from "../types/mail.types";
import { LoadTemplate } from "./loadtemplate";
const config = require("../../config");
export class classMailer {
  transporter = null;
  debugEmail = "";

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_SERVER, // replace with your SMTP endpoint
      port: config.SMTP_PORT, // SMTP port
      secure: config.SMTP_USE_TLS === "true" ? true : false, // true for 465, false for other ports
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });
    if (config.DEBUG_EMAIL) this.debugEmail = config.DEBUG_EMAIL;
  }

  async sendEmail(object: IEmail) {
    try {
      const template = await new LoadTemplate().getTemplate("generic.html");
      if (config.NODE_ENV === "development") object.emailTo = this.debugEmail;
      const mailOptions = {
        from: config.SMTP_SENDER,
        to: object.emailTo,
        subject: object.subject,
        html: template.replace("__content", object.html),
      };
      const response = await this.transporter.sendMail(mailOptions);
      return { response };
    } catch (error) {
      return { error };
    }
  }
}
