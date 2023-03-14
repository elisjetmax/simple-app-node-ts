"use strict";
//services crud for otps
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpsServices = void 0;
const otps_model_1 = __importDefault(require("../models/otps.model"));
const otp_1 = require("../utils/otp");
const communicator_services_1 = require("./communicator.services");
const users_services_1 = require("./users.services");
const config = require("../../config");
class OtpsServices {
    constructor() {
        this.create = ({ value = (0, otp_1.generateOTP)(6), type = "email", isActive = true, expiresIn = 3600, userId, channel = "email", }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otpInput = {
                    value: yield (0, users_services_1.HashText)(value),
                    type,
                    isActive,
                    expiresIn,
                    userId,
                    channel,
                };
                yield this.processAllOtpOfUserAndType(userId, type);
                yield otps_model_1.default.create(otpInput);
                let user = yield new users_services_1.userServices().getById(userId);
                if (user === null || user === void 0 ? void 0 : user.error)
                    return { error: user.error };
                user = user;
                let communicator;
                let wasSend = true;
                if (channel === "email") {
                    communicator = yield this._communicatorServices.mail(user.email, `${config.SMS_PREMESSAGE} Authentication OTP...`, `<p>To authenticate, please use the following One Time Password (OTP):</p>
          <h3>${value}</h3>
          <p>Do not share this OTP with anyone. SomosBow takes your account security very seriously. 
          SomosBow Customer Service will never ask you to disclose or verify your SomosBow password, 
          OTP, credit card, or banking account number. If you receive a suspicious email with a link 
          to update your account information, do not click on the link--instead, report the email to 
          SomosBow for investigation. We hope to see you again soon.</p>
          <p>Thanks for stay together SomosBow!</p>`);
                    if (communicator === null || communicator === void 0 ? void 0 : communicator.error) {
                        console.log("error sending otp by email", communicator.error);
                        wasSend = false;
                    }
                }
                if (channel === "sms") {
                    communicator = yield this._communicatorServices.sms(user.phone, `Please use the following One Time Password (OTP): ${value} to authenticate.`);
                    if (communicator === null || communicator === void 0 ? void 0 : communicator.error) {
                        console.log("error sending otp by sms", communicator.error);
                        wasSend = false;
                    }
                }
                return { wasSend, mail: communicator };
            }
            catch (error) {
                return { error };
            }
        });
        this.getOtp = (userId, type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield otps_model_1.default
                    .findOne({ userId, type, isActive: true, isProcessed: false })
                    .lean();
                return otp;
            }
            catch (error) {
                return { error };
            }
        });
        this.getOtpById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield otps_model_1.default.findById(id).lean();
                return otp;
            }
            catch (error) {
                return { error };
            }
        });
        this.setAsProcessed = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield otps_model_1.default.findByIdAndUpdate(id, {
                    isProcessed: true,
                    processedAt: new Date(),
                    isActive: false,
                });
                return true;
            }
            catch (error) {
                return { error };
            }
        });
        this.setAsExpired = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield otps_model_1.default.findByIdAndUpdate(id, {
                    isActive: false,
                    isProcessed: false,
                    processedAt: new Date(),
                });
                return true;
            }
            catch (error) {
                return { error };
            }
        });
        this.processAllOtpOfUserAndType = (userId, type) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield otps_model_1.default.updateMany({ userId, type }, {
                    isProcessed: false,
                    processedAt: new Date(),
                    isActive: false,
                });
                return true;
            }
            catch (error) {
                return { error };
            }
        });
        this._communicatorServices = new communicator_services_1.CommunicatorServices();
    }
}
exports.OtpsServices = OtpsServices;
