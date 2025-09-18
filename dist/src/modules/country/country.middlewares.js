"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCountryUpdate = exports.validateIdParam = exports.validateCreatePayload = exports.countrySecure = void 0;
const country_validations_1 = require("./country.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const countrySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for country module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.countrySecure = countrySecure;
const validateCreatePayload = (req, res, next) => {
    try {
        const validated = country_validations_1.countryFlexibleSchema.parse(req.body);
        //const normalized = Array.isArray(validated) ? validated : [validated];
        req.body = validated;
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
        country_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
const validateCountryUpdate = (req, res, next) => {
    try {
        const validated = country_validations_1.countryUpdateFlexibleSchema.parse(req.body);
        req.body = validated;
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
exports.validateCountryUpdate = validateCountryUpdate;
