import { Schema, model } from "mongoose";
import { IOtp } from "../types/otps.types";
const otpsSchema = new Schema<IOtp>(
  {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
      default: 3600,
    },
    isProcessed: {
      type: Boolean,
      default: false,
      required: true,
    },
    processedAt: {
      type: Date,
    },
    userId: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
      default: "email",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IOtp>("Otps", otpsSchema);
