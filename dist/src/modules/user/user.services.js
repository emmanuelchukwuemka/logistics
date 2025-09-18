"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signupService = void 0;
const user_models_1 = __importDefault(require("./user.models"));
const auth_models_1 = __importDefault(require("../auth/auth.models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupService = async (data) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email.trim().toLocaleLowerCase(),
            phone: data.phone,
            city_id: data.city_id,
            is_verified: 0,
        };
        // Insert into the database
        const newUser = await user_models_1.default.create(userData);
        // Prepare auth data
        const authData = {
            user_id: newUser.id,
            email: data.email,
            password: hashedPassword,
        };
        // Insert into auth_table
        await auth_models_1.default.create(authData);
        return {
            success: true,
            message: "User created successfully",
            data: { id: newUser.id },
        };
    }
    catch (error) {
        console.error("Signup error:", error);
        return {
            success: false,
            message: "User creation failed",
        };
    }
};
exports.signupService = signupService;
const profile = async (userId) => {
    try {
        const user = await user_models_1.default.findByPk(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            message: "User profile accessed successfully",
            data: user.get({ plain: true }),
        };
    }
    catch (error) {
        console.error("Profile error:", error);
        return {
            success: false,
            message: "Unable to service this request",
        };
    }
};
exports.profile = profile;
