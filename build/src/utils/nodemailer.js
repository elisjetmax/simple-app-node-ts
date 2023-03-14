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
exports.classMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const loadtemplate_1 = require("./loadtemplate");
const config = require("../../config");
class classMailer {
    constructor() {
        this.transporter = null;
        this.debugEmail = "";
        this.transporter = nodemailer_1.default.createTransport({
            host: config.SMTP_SERVER,
            port: config.SMTP_PORT,
            secure: config.SMTP_USE_TLS === "true" ? true : false,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD,
            },
        });
        if (config.DEBUG_EMAIL)
            this.debugEmail = config.DEBUG_EMAIL;
    }
    sendEmail(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const template = yield new loadtemplate_1.LoadTemplate().getTemplate("generic.html");
                if (config.NODE_ENV === "development")
                    object.emailTo = this.debugEmail;
                const mailOptions = {
                    from: config.SMTP_SENDER,
                    to: object.emailTo,
                    subject: object.subject,
                    html: template.replace("__content", object.html),
                };
                const response = yield this.transporter.sendMail(mailOptions);
                return { response };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.classMailer = classMailer;
