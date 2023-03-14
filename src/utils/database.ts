import session from "express-session";
import mongoose from "mongoose";
const config = require("../../config");

export const mongoConnect = (init) => {
  mongoose
    .connect(
      config.NODE_ENV === "development"
        ? config.DB_CONN_STRING_DEV
        : config.DB_CONN_STRING_PRO
    )
    .then((db) => {
      console.log("DB is connected!");
      if (init) init(db);
    })
    .catch((error) => {
      console.log("**********************************************************");
      console.log("MONGO CONNECTION ERROR");
      console.error(error);
      console.log("**********************************************************");
    });
};

export const mongoDBStore = () => {
  const MongoDBStore = require("connect-mongodb-session")(session);
  const store = new MongoDBStore({
    uri:
      config.NODE_ENV === "development"
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

export const SessionEnabled = () => {
  var sess = require("express-session")({
    secret: config.SECRET_FOR_TOKEN,
    cookie: {
      maxAge: 1000 * 60 * 30, // 30 Minutos
    },
    store: mongoDBStore(),
    resave: true,
    saveUninitialized: true,
    rolling: true,
  });
  return sess;
};
