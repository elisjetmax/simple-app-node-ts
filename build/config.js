"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    DB_CONN_STRING_DEV: process.env.DB_CONN_STRING_DEV || "",
    DB_CONN_STRING_PRO: process.env.DB_CONN_STRING_PRO || "",
    SECRET_FOR_TOKEN: process.env.SECRET_FOR_TOKEN || "",
    EXPIRES_FOR_TOKEN: process.env.EXPIRES_FOR_TOKEN || 3,
    TOKEN_EXPIRE_REQUEST: process.env.TOKEN_EXPIRE_REQUEST || 1,
    DEBUG_EMAIL: process.env.DEBUG_EMAIL || "",
    HOST_PRODUCTION: process.env.HOST_PRODUCTION || "",
    HOST_DEVELOPMENT: process.env.HOST_DEVELOPMENT || "",
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
    SENDGRID_SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL || "",
    SENDGRID_SENDER_NAME: process.env.SENDGRID_SENDER_NAME || "",
    USE_IPFILTER_MODULE: process.env.USE_IPFILTER_MODULE || "",
    WHITELIST_IPS: process.env.WHITELIST_IPS || "",
    WHITELIST_CORS: process.env.WHITELIST_CORS || "",
    SMTP_SERVER: process.env.SMTP_SERVER || "",
    SMTP_PORT: process.env.SMTP_PORT || "",
    SMTP_USE_TLS: process.env.SMTP_USE_TLS || "",
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
    SMTP_SENDER: process.env.SMTP_SENDER || "",
    PATH: process.env.PWD || "",
    SMS_API: process.env.SMS_API || "",
    SMS_USER: process.env.SMS_USER || "",
    SMS_ENDPOINT: process.env.SMS_ENDPOINT || "",
    SMS_PREMESSAGE: process.env.SMS_PREMESSAGE || "",
};
