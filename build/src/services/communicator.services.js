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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicatorServices = void 0;
const labsMobileSMS_1 = require("../extras/labsMobileSMS");
const nodemailer_1 = require("../utils/nodemailer");
class CommunicatorServices {
    constructor() {
        this.mail = (emailTo, subject, html) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rerturnedData = yield new nodemailer_1.classMailer().sendEmail({
                    emailTo,
                    subject,
                    html,
                });
                return { mail: rerturnedData };
            }
            catch (error) {
                return { error };
            }
        });
        this.sms = (phone, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sms = yield new labsMobileSMS_1.LabsMobileSMS().send(phone, message);
                return { sms };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.CommunicatorServices = CommunicatorServices;
