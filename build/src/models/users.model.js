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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    emailVerification: {
        type: Boolean,
        default: false,
        required: true,
    },
    phoneVerification: {
        type: Boolean,
        default: false,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    id: false,
    timestamps: true,
    versionKey: false,
});
usersSchema.statics.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(12);
    const passHashed = yield bcryptjs_1.default.hash(password, salt);
    return passHashed;
});
usersSchema.statics.generateToken = (payload, expireInHours) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield jsonwebtoken_1.default.sign(payload, process.env.SECRET_FOR_TOKEN || "", {
        expiresIn: expireInHours * 60 * 60,
    });
    return token;
});
usersSchema.statics.comparePassword = (password, receivedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, receivedPassword);
});
usersSchema.set("toObject", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.password;
    },
});
usersSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.password;
    },
});
exports.default = (0, mongoose_1.model)("Users", usersSchema);
