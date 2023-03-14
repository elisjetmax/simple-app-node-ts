"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = void 0;
const checkSession = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
exports.checkSession = checkSession;
