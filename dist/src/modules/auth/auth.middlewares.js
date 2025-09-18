"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.authSecure = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_validations_1 = require("./auth.validations");
const authSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for auth module");
        // validate request body
        req.body = auth_validations_1.loginSchema.parse(req.body);
        next();
    }
    catch (err) {
        console.log("Error in authSecure:", err);
        return res.status(400).json({
            success: false,
            message: "Validation error",
            details: err.errors ?? err.issues,
        });
    }
};
exports.authSecure = authSecure;
// JWT Authentication Middleware
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token required",
            });
        }
        // Verify JWT token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        console.log("JWT verification error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }
        return res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
};
exports.authenticate = authenticate;
