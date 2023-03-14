import { LabsMobileSMS } from "../extras/labsMobileSMS";
import { LoadTemplate } from "../utils/loadtemplate";
import { classMailer } from "../utils/nodemailer";

export class CommunicatorServices {
  constructor() {}

  mail = async (emailTo: string, subject: string, html: string) => {
    try {
      const rerturnedData = await new classMailer().sendEmail({
        emailTo,
        subject,
        html,
      });
      return { mail: rerturnedData };
    } catch (error) {
      return { error };
    }
  };
  sms = async (phone: string, message: string) => {
    try {
      const sms = await new LabsMobileSMS().send(phone, message);
      return { sms };
    } catch (error) {
      return { error };
    }
  };
}
