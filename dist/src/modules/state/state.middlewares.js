"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStateUpdate = exports.validateIdParam = exports.validateCreatePayload = exports.stateSecure = void 0;
const apiResponse_1 = require("../../globals/utility/apiResponse");
const state_validations_1 = require("./state.validations");
const zod_1 = require("zod");
const stateSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for state module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.stateSecure = stateSecure;
// Validate create state payload
const validateCreatePayload = (req, res, next) => {
    try {
        state_validations_1.stateBulkOrSingleSchema.parse(req.body);
        next();
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: err.errors || err
        });
    }
};
exports.validateCreatePayload = validateCreatePayload;
const validateIdParam = (req, res, next) => {
    try {
        state_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
// Validate update state payload
const validateStateUpdate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided to update",
            });
        }
        // Parse and validate
        const validatedData = state_validations_1.stateFlexibleSchema.parse(req.body);
        // Normalize to array for service
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
exports.validateStateUpdate = validateStateUpdate;
