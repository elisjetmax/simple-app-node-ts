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
const express_1 = require("express");
const otps_services_1 = require("../services/otps.services");
const otp_1 = require("../utils/otp");
const otpsRoutes = (0, express_1.Router)();
otpsRoutes.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataOtp = {
        value: (0, otp_1.generateOTP)(6),
        type: req.body.type || "email",
        isActive: true,
        expiresIn: 3600,
        userId: req.body.userId,
        channel: req.body.channel || "email",
    };
    let isCreated = (yield new otps_services_1.OtpsServices().create(dataOtp));
    if (isCreated === true)
        isCreated = { created: true };
    return res.json(isCreated);
}));
exports.default = otpsRoutes;
