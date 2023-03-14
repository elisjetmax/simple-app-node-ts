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
exports.sendEmailTransport = void 0;
const config = require("../../config");
const sendEmailTransport = ({ emailTo, subject, html, textCopy = "", callback = null, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("emailTo 1111:>> ", emailTo);
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    const originalEmailTo = emailTo;
    let host = config.HOST_PRODUCTION;
    if (config.NODE_ENV === "development") {
        emailTo = config.DEBUG_EMAIL_SENDER;
        host = config.HOST_DEVELOPMENT;
    }
    const fs = require("fs").promises;
    let htmlTemp = yield fs.readFile(__dirname + "/../templates/generic.html", "utf8");
    html = html.replace(/__host/gi, host);
    htmlTemp = htmlTemp.replace("__content", html);
    if (config.NODE_ENV === "development")
        htmlTemp =
            htmlTemp +
                "<hr/><p>Original Email Recipient: " +
                originalEmailTo +
                "<br/>Debug Mode: ON<p>";
    console.log("emailTo :>> ", emailTo);
    const arrTo = emailTo.split(",");
    const toEmails = arrTo.map((email) => ({ email }));
    const msg = {
        personalizations: [
            {
                to: toEmails,
            },
        ],
        from: {
            email: config.SENDGRID_SENDER_EMAIL,
            name: config.SENDGRID_SENDER_NAME,
        },
        subject: subject,
        text: textCopy,
        html: htmlTemp,
    };
    sgMail
        .send(msg)
        .then((data) => {
        if (callback)
            callback({ success: "Email Sent", data });
    })
        .catch((error) => {
        console.log("Error enviando el correo");
        console.error(error);
        const { body } = error.response;
        console.error("body", body);
        if (callback)
            callback({ exception: error });
    });
});
exports.sendEmailTransport = sendEmailTransport;
