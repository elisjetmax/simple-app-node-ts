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
const partners_services_1 = require("../services/partners.services");
const partnerRoutes = (0, express_1.Router)();
partnerRoutes.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partners = yield new partners_services_1.PartnerServices().getAll();
    res.json(partners);
}));
partnerRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partner = yield new partners_services_1.PartnerServices().getById(req.query.id.toString());
    res.json(partner);
}));
partnerRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partner = yield new partners_services_1.PartnerServices().delete(req.query.id.toString());
    res.json(partner);
}));
partnerRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partner = yield new partners_services_1.PartnerServices().update(req.query.id.toString(), req.body);
    res.json(partner);
}));
partnerRoutes.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partner = yield new partners_services_1.PartnerServices().create(req.body);
    res.json(partner);
}));
exports.default = partnerRoutes;
