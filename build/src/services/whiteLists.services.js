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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteListServices = void 0;
const whiteListIps_model_1 = __importDefault(require("../models/whiteListIps.model"));
const express_ipfilter_1 = require("express-ipfilter");
class whiteListServices {
    constructor() { }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nroWhiteListsIps = yield whiteListIps_model_1.default.estimatedDocumentCount();
                if (nroWhiteListsIps)
                    return;
                console.log("Creando WhiteLists Ips...");
                const values = yield Promise.all([
                    new whiteListIps_model_1.default({
                        IP: "::1",
                        description: "localhost IPv6",
                    }).save(),
                    new whiteListIps_model_1.default({
                        IP: "127.0.0.1",
                        description: "localhost IPv4",
                    }).save(),
                ]);
                console.log("WhiteLists Ips Creados!");
            }
            catch (error) {
                return { error };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whiteLists = yield whiteListIps_model_1.default.find().lean();
                return [...whiteLists];
            }
            catch (error) {
                return { error };
            }
        });
    }
    getByIP(IP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whiteIpItem = yield whiteListIps_model_1.default.findOne({ IP }).lean();
                if (!whiteIpItem)
                    return null;
                return Object.assign({}, whiteIpItem);
            }
            catch (error) {
                return { error };
            }
        });
    }
    addToFilter(app, ips) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("adding this IPs to filter:", ips);
            app.use((0, express_ipfilter_1.IpFilter)(ips, { mode: "allow" }));
            app.set("filteredIpList", ips);
            console.log("IPs added to filter");
        });
    }
    create(whiteList) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.getByIP(whiteList.IP))
                    return { error: "IP already exists in WhiteList" };
                yield new whiteListIps_model_1.default(whiteList).save();
                return yield this.getAll();
            }
            catch (error) {
                return { error };
            }
        });
    }
    delete(IP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield whiteListIps_model_1.default.deleteOne({ IP });
                return yield this.getAll();
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.whiteListServices = whiteListServices;
