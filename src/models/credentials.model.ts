import { Schema, model } from "mongoose";
import { ICredentials } from "../types/credentials.types";
const credentialsSchema = new Schema<ICredentials>(
  {
    idEntity: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    apiSecret: {
      type: String,
      required: true,
    },
    credentialFor: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ICredentials>("Credentials", credentialsSchema);
