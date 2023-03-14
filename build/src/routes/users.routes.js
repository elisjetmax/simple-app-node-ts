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
const users_services_1 = require("../services/users.services");
const otp_1 = require("../utils/otp");
const usersRouters = (0, express_1.Router)();
usersRouters.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreated = yield new users_services_1.userServices().create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password || (0, otp_1.generateOTP)(6),
        phone: req.body.phone || "",
    });
    const user = userCreated;
    return res.json(Object.assign({}, user));
}));
exports.default = usersRouters;
