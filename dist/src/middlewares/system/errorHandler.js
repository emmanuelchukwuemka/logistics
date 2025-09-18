"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
function errorHandler(err, req, res, next) {
    console.error("🔥 Error caught:", err);
    // Handle validation errors from Zod
    if (err instanceof zod_1.ZodError) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: "Validation failed",
            details: err.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        });
    }
    // Handle custom errors that include statusCode/message
    if (err.statusCode) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: err.statusCode,
            message: err.message,
            details: err.details,
        });
    }
    // Default: unexpected server error
    return (0, apiResponse_1.errorResponse)(res, {
        statusCode: 500,
        message: "Internal Server Error",
        details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}
