"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpsSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Otps", otpsSchema);
