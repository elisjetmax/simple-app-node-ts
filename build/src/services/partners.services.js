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
exports.PartnerServices = void 0;
const partners_model_1 = __importDefault(require("../models/partners.model"));
class PartnerServices {
    constructor() { }
    create(partner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("partner :>> ", partner);
                const partnerCreated = yield new partners_model_1.default(Object.assign({}, partner)).save();
                return yield this.getById(partnerCreated._id.toString());
            }
            catch (error) {
                return { error };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partner = yield partners_model_1.default.findById(id).lean();
                return Object.assign({}, partner);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partners = yield partners_model_1.default.find({ isDeleted: false }).lean();
                return partners;
            }
            catch (error) {
                return { error };
            }
        });
    }
    update(id, partnerUpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield partners_model_1.default.findByIdAndUpdate(id, partnerUpdateData, {
                    new: true,
                });
                return yield this.getById(id);
            }
            catch (error) {
                return { error };
            }
        });
    }
    logicDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield partners_model_1.default.findByIdAndUpdate(id, {
                    isDeleted: true,
                    isActive: false,
                });
                return { deleted: true };
            }
            catch (error) {
                return { error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield partners_model_1.default.findByIdAndDelete(id);
                return { deleted: true };
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.PartnerServices = PartnerServices;
