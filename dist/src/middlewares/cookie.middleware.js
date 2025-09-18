"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyCookie = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json({ success: false, message: "Unauthorized", statusCode: 401 });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyCookie = verifyCookie;
