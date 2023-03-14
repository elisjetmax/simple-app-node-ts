"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEnabled = exports.mongoDBStore = exports.mongoConnect = void 0;
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const config = require("../../config");
const mongoConnect = (init) => {
    mongoose_1.default
        .connect(config.NODE_ENV === "development"
        ? config.DB_CONN_STRING_DEV
        : config.DB_CONN_STRING_PRO)
        .then((db) => {
        console.log("DB is connected!");
        if (init)
            init(db);
    })
        .catch((error) => {
        console.log("**********************************************************");
        console.log("MONGO CONNECTION ERROR");
        console.error(error);
        console.log("**********************************************************");
    });
};
exports.mongoConnect = mongoConnect;
const mongoDBStore = () => {
    const MongoDBStore = require("connect-mongodb-session")(express_session_1.default);
    const store = new MongoDBStore({
        uri: config.NODE_ENV === "development"
            ? config.DB_CONN_STRING_DEV
            : config.DB_CONN_STRING_PRO,
        collection: "SessionsData",
    });
    store.on("error", function (error) {
        console.log("**********************************************************");
        console.log("MONGO CONNECTION ERROR - STORE");
        console.error(error);
        console.log("**********************************************************");
    });
    return store;
};
exports.mongoDBStore = mongoDBStore;
const SessionEnabled = () => {
    var sess = require("express-session")({
        secret: config.SECRET_FOR_TOKEN,
        cookie: {
            maxAge: 1000 * 60 * 30, // 30 Minutos
        },
        store: (0, exports.mongoDBStore)(),
        resave: true,
        saveUninitialized: true,
        rolling: true,
    });
    return sess;
};
exports.SessionEnabled = SessionEnabled;
