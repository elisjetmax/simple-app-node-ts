import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types/users.types";

const usersSchema = new Schema<IUser>(
  {
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
  },
  {
    id: false,
    timestamps: true,
    versionKey: false,
  }
);

usersSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const passHashed = await bcrypt.hash(password, salt);
  return passHashed;
};

usersSchema.statics.generateToken = async (payload, expireInHours) => {
  const token = await jwt.sign(payload, process.env.SECRET_FOR_TOKEN || "", {
    expiresIn: expireInHours * 60 * 60,
  });
  return token;
};

usersSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

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

export default model<IUser>("Users", usersSchema);
