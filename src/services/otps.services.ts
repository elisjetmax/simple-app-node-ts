//services crud for otps

import { IOtp } from "../types/otps.types";

import otpsModel from "../models/otps.model";
import { generateOTP } from "../utils/otp";
import { CommunicatorServices } from "./communicator.services";
import { HashText, userServices } from "./users.services";
import { IUserOutput } from "../types/users.types";
const config = require("../../config");

export class OtpsServices {
  _communicatorServices: CommunicatorServices;
  constructor() {
    this._communicatorServices = new CommunicatorServices();
  }

  create = async ({
    value = generateOTP(6),
    type = "email",
    isActive = true,
    expiresIn = 3600,
    userId,
    channel = "email",
  }) => {
    try {
      const otpInput: IOtp = {
        value: await HashText(value),
        type,
        isActive,
        expiresIn,
        userId,
        channel,
      };
      await this.processAllOtpOfUserAndType(userId, type);
      await otpsModel.create(otpInput);

      let user: any = await new userServices().getById(userId);
      if (user?.error) return { error: user.error };
      user = user as IUserOutput;

      let communicator;
      let wasSend = true;

      if (channel === "email") {
        communicator = await this._communicatorServices.mail(
          user.email,
          `${config.SMS_PREMESSAGE} Authentication OTP...`,
          `<p>To authenticate, please use the following One Time Password (OTP):</p>
          <h3>${value}</h3>
          <p>Do not share this OTP with anyone. SomosBow takes your account security very seriously. 
          SomosBow Customer Service will never ask you to disclose or verify your SomosBow password, 
          OTP, credit card, or banking account number. If you receive a suspicious email with a link 
          to update your account information, do not click on the link--instead, report the email to 
          SomosBow for investigation. We hope to see you again soon.</p>
          <p>Thanks for stay together SomosBow!</p>`
        );
        if (communicator?.error) {
          console.log("error sending otp by email", communicator.error);
          wasSend = false;
        }
      }
      if (channel === "sms") {
        communicator = await this._communicatorServices.sms(
          user.phone,
          `Please use the following One Time Password (OTP): ${value} to authenticate.`
        );
        if (communicator?.error) {
          console.log("error sending otp by sms", communicator.error);
          wasSend = false;
        }
      }

      return { wasSend, mail: communicator };
    } catch (error) {
      return { error };
    }
  };

  getOtp = async (userId: string, type: string) => {
    try {
      const otp = await otpsModel
        .findOne({ userId, type, isActive: true, isProcessed: false })
        .lean();
      return otp;
    } catch (error) {
      return { error };
    }
  };

  getOtpById = async (id: string) => {
    try {
      const otp = await otpsModel.findById(id).lean();
      return otp;
    } catch (error) {
      return { error };
    }
  };

  setAsProcessed = async (id: string) => {
    try {
      await otpsModel.findByIdAndUpdate(id, {
        isProcessed: true,
        processedAt: new Date(),
        isActive: false,
      });
      return true;
    } catch (error) {
      return { error };
    }
  };

  setAsExpired = async (id: string) => {
    try {
      await otpsModel.findByIdAndUpdate(id, {
        isActive: false,
        isProcessed: false,
        processedAt: new Date(),
      });
      return true;
    } catch (error) {
      return { error };
    }
  };

  processAllOtpOfUserAndType = async (userId: string, type: string) => {
    try {
      await otpsModel.updateMany(
        { userId, type },
        {
          isProcessed: false,
          processedAt: new Date(),
          isActive: false,
        }
      );
      return true;
    } catch (error) {
      return { error };
    }
  };
}
