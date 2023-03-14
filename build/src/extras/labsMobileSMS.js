"use strict";
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
exports.LabsMobileSMS = void 0;
const axios_1 = __importDefault(require("axios"));
const config = require("../../config");
class LabsMobileSMS {
    constructor() {
        this.sendSMS = (mobileNumber, message) => __awaiter(this, void 0, void 0, function* () {
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
                    Authorization: "Basic " +
                        Buffer.from(`${config.SMS_USER}:${config.SMS_API}`).toString("base64"),
                    "Cache-Control": "no-cache",
                },
                data,
            };
            const fecth = yield (0, axios_1.default)(config.SMS_ENDPOINT, options);
            return fecth.data;
        });
        this.send = (mobileNumber, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sms = yield this.sendSMS(mobileNumber, message);
                return { sms };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.LabsMobileSMS = LabsMobileSMS;
