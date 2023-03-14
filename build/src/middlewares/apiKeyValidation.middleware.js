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
exports.validateApiCredentials = void 0;
const credentials_services_1 = __importDefault(require("../services/credentials.services"));
const generics_1 = require("../utils/generics");
const validateApiCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json({ error: "Authorization header missing" });
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer") {
        return res.status(401).json({ error: "Invalid authorization scheme" });
    }
    const [email, clearApiKey] = token.split(":");
    if (!(0, generics_1.validateEmail)(email) || !clearApiKey)
        return res.status(401).json({ error: "The credential format is invalid" });
    const credential = yield new credentials_services_1.default().getCredentialIfIsValid(email, clearApiKey);
    if (!credential)
        return res.status(401).json({ error: "Invalid credentials" });
    req.credentials = credential;
    next();
});
exports.validateApiCredentials = validateApiCredentials;
