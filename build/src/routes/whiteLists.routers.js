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
const whiteLists_services_1 = require("../services/whiteLists.services");
class whiteListRoutes {
    constructor() {
        this._whiteListRoutes = (0, express_1.Router)();
    }
    routes(app) {
        return __awaiter(this, void 0, void 0, function* () {
            this._whiteListRoutes.post("/create", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const dataIP = {
                    IP: req.body.IP,
                    description: req.body.description,
                };
                let whiteListRows = (yield new whiteLists_services_1.whiteListServices().create(dataIP));
                const { error } = whiteListRows;
                if (error)
                    return res.json({ error });
                whiteListRows = whiteListRows;
                const IPs = (whiteListRows && whiteListRows.map((x) => x.IP)) || [];
                yield new whiteLists_services_1.whiteListServices().addToFilter(app, IPs);
                console.log(`La [${dataIP.IP} - ${dataIP.description}] ha sido agregada a la WhiteList`);
                return res.json(whiteListRows);
            }));
            this._whiteListRoutes.delete("/delete/:IP", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { IP } = req.params;
                let whiteListRows = (yield new whiteLists_services_1.whiteListServices().delete(IP));
                const { error } = whiteListRows;
                if (error)
                    return res.json({ error });
                whiteListRows = whiteListRows;
                const IPs = (whiteListRows && whiteListRows.map((x) => x.IP)) || [];
                yield new whiteLists_services_1.whiteListServices().addToFilter(app, IPs);
                console.log(`La [${IP}] ha sido eliminada a la WhiteList`);
                return res.json(whiteListRows);
            }));
            return this._whiteListRoutes;
        });
    }
}
exports.default = whiteListRoutes;
