import { Schema, model } from "mongoose";
import { IWhiteList } from "../types/whiteLists.types";
const whiteListsSchema = new Schema<IWhiteList>(
  {
    IP: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export default model<IWhiteList>("WhiteLists", whiteListsSchema);
