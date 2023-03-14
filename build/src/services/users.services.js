"use strict";
//create crud for User model
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
exports.userServices = exports.CompareHashedText = exports.HashText = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const HashText = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(12);
    const passHashed = yield bcryptjs_1.default.hash(password, salt);
    return passHashed;
});
exports.HashText = HashText;
const CompareHashedText = (hashedText, clearText) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(clearText, hashedText);
});
exports.CompareHashedText = CompareHashedText;
class userServices {
    constructor() { }
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existsUser = yield this.getByEmail(userInput.email);
                if (existsUser) {
                    const { error } = existsUser;
                    if (error)
                        return existsUser;
                    if (existsUser)
                        return { error: "User already exists" };
                }
                const userData = Object.assign(Object.assign({}, userInput), { password: yield (0, exports.HashText)(userInput.password) });
                const user = yield users_model_1.default.create(userData);
                return yield this.getById(user._id.toString());
            }
            catch (error) {
                return { error };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_model_1.default.findById(id).lean();
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return Object.assign({}, userWithoutPassword);
            }
            catch (error) {
                return { error };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_model_1.default.findOne({ email }).lean();
                if (!user)
                    return null;
                const { password } = user, userWithoutPassword = __rest(user, ["password"]);
                return Object.assign({}, userWithoutPassword);
            }
            catch (error) {
                return { error };
            }
        });
    }
    update(id, userUpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_model_1.default.findByIdAndUpdate(id, userUpdateData, {
                    new: true,
                });
                return yield this.getById(id);
            }
            catch (error) {
                return { error };
            }
        });
    }
    deleteLogic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
                return yield this.getById(id);
            }
            catch (error) {
                return { error };
            }
        });
    }
}
exports.userServices = userServices;
