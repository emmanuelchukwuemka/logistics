"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(res, { statusCode = 200, message, data }) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}
function errorResponse(res, { statusCode = 500, message, details }) {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        details,
    });
}
