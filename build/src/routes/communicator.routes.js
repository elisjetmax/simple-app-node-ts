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
const communicator_services_1 = require("../services/communicator.services");
const config = require("../../config");
const communicatorRoutes = (0, express_1.Router)();
communicatorRoutes.post("/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mail = yield new communicator_services_1.CommunicatorServices().mail(req.body.emailTo, req.body.subject, req.body.html);
    return res.json({ mail });
}));
communicatorRoutes.post("/sms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sms = yield new communicator_services_1.CommunicatorServices().sms(req.body.phone, `${config.SMS_PREMESSAGE} ${req.body.message.toString()}`.substring(0, 160));
    return res.json({ sms });
}));
exports.default = communicatorRoutes;
