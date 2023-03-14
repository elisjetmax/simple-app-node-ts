"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatedApyKey = exports.generateRandomString = exports.generateOTP = void 0;
const generateOTP = (length) => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateOTP = generateOTP;
const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
};
exports.generateRandomString = generateRandomString;
const formatedApyKey = () => {
    const apiKey = (0, exports.generateRandomString)(16);
    const size = 4;
    const result = apiKey.replace(new RegExp(`.{${size}}`, "g"), "$&-");
    return result.substring(0, result.length % size === 0 ? result.length - 1 : result.length);
};
exports.formatedApyKey = formatedApyKey;
