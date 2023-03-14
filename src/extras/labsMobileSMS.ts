import axios from "axios";
const config = require("../../config");

export class LabsMobileSMS {
  constructor() {}

  private sendSMS = async (mobileNumber: string, message: string) => {
    const structuredSMS = {
      message,
      tpoa: "Sender",
      recipient: [
        {
          msisdn: mobileNumber,
        },
      ],
    };

    const data = JSON.stringify(structuredSMS);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${config.SMS_USER}:${config.SMS_API}`).toString(
            "base64"
          ),
        "Cache-Control": "no-cache",
      },
      data,
    };

    const fecth = await axios(config.SMS_ENDPOINT, options);
    return fecth.data;
  };

  send = async (mobileNumber: string, message: string) => {
    try {
      const sms = await this.sendSMS(mobileNumber, message);
      return { sms };
    } catch (error) {
      return { error };
    }
  };
}
