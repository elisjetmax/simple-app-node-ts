"use strict";
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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkSession_1 = require("../middlewares/checkSession");
const authRoute = (0, express_1.Router)();
const hashPassword = (password) => {
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    console.log("password :>> ", hashedPassword);
    return hashedPassword;
};
const users = [
    {
        id: 1,
        username: "admin",
        password: "$2b$10$W4A3qXOQhPz.57mRKsxtcejy6nU5uA.S813Y.QJb2AF0VsKkp.E2q",
        name: "Admin User",
    },
];
authRoute.post("/login", (req, res) => {
    let { username, password } = req.body;
    console.log("password :>> ", password);
    let user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(401).send("Username or password incorrect");
    }
    const passwordValid = bcrypt_1.default.compareSync(password, user.password);
    console.log("passwordValid :>> ", passwordValid);
    if (!passwordValid) {
        return res.status(401).send("Username or password incorrect");
    }
    const respUser = __rest(user, []);
    respUser.password = "**********";
    req.session.user = respUser;
    req.session._id =
        `$(req.sessionID)-` +
            Math.random().toString(36).substring(2, 20) +
            Math.random().toString(36) +
            Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
    console.log("req.session :>> ", req.session);
    res.json({ user: respUser, sessionId: req.sessionID });
});
authRoute.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({});
    });
});
authRoute.get("/me", checkSession_1.checkSession, (req, res) => {
    res.json(req.session.user);
});
authRoute.post("/hash", (req, res) => {
    let { password } = req.query;
    let hashedPassword = hashPassword(password);
    res.json({ password: hashedPassword });
});
exports.default = authRoute;
