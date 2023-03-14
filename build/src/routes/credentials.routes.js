"use strict";
// create the cruds routes for credentials services
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
const express_1 = require("express");
const credentials_services_1 = __importDefault(require("../services/credentials.services"));
const credentialsRoutes = (0, express_1.Router)();
credentialsRoutes.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().create(req.body);
    res.json(credentials);
}));
credentialsRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().getById(req.params.id);
    res.json(credentials);
}));
credentialsRoutes.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().getAll();
    res.json(credentials);
}));
credentialsRoutes.get("/all/:idEntity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().getAllByEntityId(req.params.idEntity);
    res.json(credentials);
}));
credentialsRoutes.delete("/logic/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().deleteLogic(req.params.id);
    res.json(credentials);
}));
credentialsRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield new credentials_services_1.default().delete(req.params.id);
    res.json(credentials);
}));
exports.default = credentialsRoutes;
