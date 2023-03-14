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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const credentials_model_1 = __importDefault(require("../models/credentials.model"));
const otp_1 = require("../utils/otp");
const users_services_1 = require("./users.services");
class CredentialsServices {
    constructor() {
        this.prepareRows = (rows) => {
            return rows.map((row) => {
                let { apiSecret } = row, credentials = __rest(row, ["apiSecret"]);
                return credentials;
            });
        };
    }
    create(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield this.getByEmailAndCredentialFor(credentials.email, credentials.credentialFor);
                if (exists) {
                    throw `This ${credentials.credentialFor} have a API Key for this email.`;
                }
                const clearKeys = {
                    apiSecret: (0, otp_1.generateRandomString)(32),
                    apiKey: (0, otp_1.formatedApyKey)(),
                };
                credentials.apiSecret = yield (0, users_services_1.HashText)(clearKeys.apiSecret);
                credentials.apiKey = yield (0, users_services_1.HashText)(clearKeys.apiKey);
                const credentialsCreated = yield new credentials_model_1.default(Object.assign({}, credentials)).save();
                let result = yield this.getById(credentialsCreated._id.toString());
                return Object.assign(Object.assign({}, result), clearKeys);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getByEmailAndCredentialFor(email, credentialFor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let credentialsResult = yield credentials_model_1.default.findOne({
                    email,
                    credentialFor,
                    isActive: true,
                    isDeleted: false,
                });
                if (credentialsResult) {
                    let { apiKey, apiSecret } = credentialsResult, credentials = __rest(credentialsResult, ["apiKey", "apiSecret"]);
                    return Object.assign({}, credentials);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log("error", error);
                return { error };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let credentialsResult = yield credentials_model_1.default.findById(id).lean();
                if (credentialsResult) {
                    let { apiSecret } = credentialsResult, credentials = __rest(credentialsResult, ["apiSecret"]);
                    credentialsResult = credentials;
                }
                let { apiKey, apiSecret } = credentialsResult, credentialsResultData = __rest(credentialsResult, ["apiKey", "apiSecret"]);
                return Object.assign({}, credentialsResultData);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getAllByEntityId(idEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = yield credentials_model_1.default.find({ idEntity }).lean();
                if (credentials && credentials.length > 0)
                    return this.prepareRows(credentials);
                return [];
            }
            catch (error) {
                return { error };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = yield credentials_model_1.default.find().lean();
                if (credentials && credentials.length > 0)
                    return this.prepareRows(credentials);
                return [];
            }
            catch (error) {
                return { error };
            }
        });
    }
    deleteLogic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield credentials_model_1.default.findByIdAndUpdate(id, { isDeleted: true });
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
                yield credentials_model_1.default.findByIdAndDelete(id);
                return { deleted: true };
            }
            catch (error) {
                return { error };
            }
        });
    }
    getCredentialIfIsValid(email, clearApiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = yield credentials_model_1.default.findOne({ email });
                if (!credentials)
                    throw "Incorrect credential combination";
                const { apiKey } = credentials;
                const isApiKeyValid = yield (0, users_services_1.CompareHashedText)(apiKey, clearApiKey);
                if (isApiKeyValid)
                    return yield this.getById(credentials._id.toString());
                return null;
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.default = CredentialsServices;
