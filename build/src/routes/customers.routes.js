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
const mongoose_1 = require("mongoose");
const apiKeyValidation_middleware_1 = require("../middlewares/apiKeyValidation.middleware");
const isPartner_middleware_1 = require("../middlewares/isPartner.middleware");
const customers_services_1 = require("../services/customers.services");
const generics_1 = require("../utils/generics");
const customersRoutes = (0, express_1.Router)();
customersRoutes.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield new customers_services_1.CustomerServices().getAll();
    res.json(customers);
}));
customersRoutes.get("/:idOrEmail", [apiKeyValidation_middleware_1.validateApiCredentials, isPartner_middleware_1.isPartnerValidation], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOrEmail } = req.params;
    let customer = null;
    if ((0, mongoose_1.isValidObjectId)(idOrEmail))
        customer = yield new customers_services_1.CustomerServices().getById(idOrEmail);
    if (!customer && (0, generics_1.validateEmail)(idOrEmail))
        customer = yield new customers_services_1.CustomerServices().getByEmail(idOrEmail);
    res.json(customer);
}));
customersRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield new customers_services_1.CustomerServices().delete(req.params.id.toString());
    res.json(customer);
}));
customersRoutes.post("/create", [apiKeyValidation_middleware_1.validateApiCredentials, isPartner_middleware_1.isPartnerValidation], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield new customers_services_1.CustomerServices().create(req.body);
    res.json(customer);
}));
customersRoutes.put("/kyc", [apiKeyValidation_middleware_1.validateApiCredentials, isPartner_middleware_1.isPartnerValidation], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body :>> ", req.body);
    const customer = yield new customers_services_1.CustomerServices().updateKYCByEmail(req.body);
    res.json(customer);
}));
customersRoutes.put("/:id", [apiKeyValidation_middleware_1.validateApiCredentials, isPartner_middleware_1.isPartnerValidation], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield new customers_services_1.CustomerServices().update(req.params.id.toString(), req.body);
    res.json(customer);
}));
exports.default = customersRoutes;
