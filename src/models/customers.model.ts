import mongoose, { Schema, model, models, MongooseError } from "mongoose";
import { ICustomer } from "../types/customers.types";

const customersSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    document: {
      type: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },
    phone: {
      countryCode: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
      },
      buildingNumber: {
        type: String,
      },
      buildingName: {
        type: String,
      },
      town: {
        type: String,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      countryAlpha2: {
        type: String,
        required: true,
        min: 2,
        max: 2,
      },
      countryAlpha3: {
        type: String,
        required: true,
        min: 3,
        max: 3,
      },
      postalCode: {
        type: String,
        required: true,
      },
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
    kyc: {
      provider: {
        type: String,
        required: true,
      },
      isValid: {
        type: Boolean,
        default: false,
        required: true,
      },
      isRejected: {
        type: Boolean,
        default: false,
        required: true,
      },
      kycId: {
        type: String,
        required: true,
      },
      requestDate: {
        type: Date,
        required: true,
        default: new Date(),
      },
      responseDate: {
        type: Date,
        required: false,
      },
      extraData: {
        type: String,
      },
    },
    relations: [
      {
        provider: {
          type: String,
          required: true,
        },
        providerId: {
          type: String,
          required: true,
        },
        extraData: {
          type: String,
        },
      },
    ],
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false,
  }
);

export default model<ICustomer>("Customers", customersSchema);
