"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContinentUpdate = exports.validateIdParam = exports.validateCreatePayload = exports.continentSecure = void 0;
const continent_validations_1 = require("./continent.validations");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const zod_1 = require("zod");
const continentSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for continent module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.continentSecure = continentSecure;
const validateCreatePayload = (req, res, next) => {
    try {
        continent_validations_1.continentFlexibleSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateCreatePayload = validateCreatePayload;
const validateIdParam = (req, res, next) => {
    try {
        continent_validations_1.idSchema.parse({ id: Number(req.params.id) });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid ID parameter",
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateIdParam = validateIdParam;
const validateContinentUpdate = (req, res, next) => {
    try {
        const validatedData = continent_validations_1.continentFlexibleSchema.parse(req.body);
        req.body = Array.isArray(validatedData) ? validatedData : [validatedData];
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateContinentUpdate = validateContinentUpdate;
