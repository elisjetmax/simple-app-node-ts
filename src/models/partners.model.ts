import { Schema, model } from "mongoose";
import { IPartner } from "../types/partners.types";
const partnersSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IPartner>("Partners", partnersSchema);
