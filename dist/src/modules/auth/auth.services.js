"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_helpers_1 = require("./auth.helpers");
const auth_models_1 = __importDefault(require("./auth.models"));
const login = async ({ email, password }) => {
    try {
        const normalizedEmail = email.trim().toLowerCase();
        const authUser = await auth_models_1.default.findOne({ where: { email: normalizedEmail } });
        if (!authUser)
            throw new Error("Invalid credentials");
        const isPasswordValid = await bcrypt_1.default.compare(password, authUser.password);
        if (!isPasswordValid)
            throw new Error("Invalid credentials");
        const userInfo = await (0, auth_helpers_1.getUserByAuthId)(authUser.user_id);
        if (!userInfo)
            throw new Error("User not found");
        // Short-lived access token (15min)
        const accessToken = jsonwebtoken_1.default.sign({ id: userInfo.id, email: userInfo.email }, process.env.JWT_SECRET, { expiresIn: "15m" });
        // Long-lived refresh token (7 days)
        const refreshToken = jsonwebtoken_1.default.sign({ id: userInfo.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
        return {
            success: true,
            message: "Login successful",
            data: { userInfo, accessToken, refreshToken },
        };
    }
    catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: error.message || "Login failed",
        };
    }
};
exports.login = login;
