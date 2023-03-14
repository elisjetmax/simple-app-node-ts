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
exports.isCustomerValidation = void 0;
const isCustomerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.credentials)
        return res
            .status(401)
            .json({ error: "Invalid credentials", code: "PR-MW-FC-01" });
    const { credentialFor } = req.credentials;
    if (credentialFor !== "customer")
        return res.status(401).json({
            error: `Invalid credentials for ${credentialFor}s`,
            code: "PR-MW-FC-02",
        });
    next();
});
exports.isCustomerValidation = isCustomerValidation;