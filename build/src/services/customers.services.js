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
exports.CustomerServices = void 0;
const customers_model_1 = __importDefault(require("../models/customers.model"));
class CustomerServices {
    constructor() { }
    create(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerCreated = yield new customers_model_1.default(Object.assign({}, customer)).save();
                return yield this.getById(customerCreated._id.toString());
            }
            catch (error) {
                return { error };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield customers_model_1.default.findById(id).lean();
                return Object.assign({}, customer);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield customers_model_1.default
                    .findOne({ email, isDeleted: false })
                    .lean();
                if (!customer)
                    return null;
                return Object.assign({}, customer);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield customers_model_1.default.find({ isDeleted: false }).lean();
                return customers;
            }
            catch (error) {
                return { error };
            }
        });
    }
    update(id, customerUpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.getById(id);
                if (!customer)
                    throw "Customer not found";
                const { error } = customer;
                if (error)
                    throw error;
                const updatedCustomer = Object.assign(Object.assign({}, customer), customerUpdateData);
                yield customers_model_1.default.findByIdAndUpdate(id, updatedCustomer, {
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
                yield customers_model_1.default.findByIdAndUpdate(id, {
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
                yield customers_model_1.default.findByIdAndDelete(id);
                return { deleted: true };
            }
            catch (error) {
                return { error };
            }
        });
    }
    updateKYCByEmail(kycUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let customer = yield this.getByEmail(kycUpdate.email);
                if (!customer)
                    throw "Customer not found";
                const { error } = customer;
                if (error)
                    throw error;
                let customerObj = customer;
                customerObj.kyc = kycUpdate.kyc;
                yield this.update(customerObj._id, customerObj);
                return Object.assign({}, customerObj);
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.CustomerServices = CustomerServices;
