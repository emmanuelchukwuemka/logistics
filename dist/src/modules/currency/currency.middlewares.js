"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateCurrency = exports.validateIdParam = exports.validateCurrencyPayload = exports.currencySecure = void 0;
const currency_validations_1 = require("./currency.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const currencySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for currency module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.currencySecure = currencySecure;
const validateCurrencyPayload = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Empty request payload",
            });
        }
        const validatedData = currency_validations_1.currencyFlexibleSchema.parse(req.body);
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
exports.validateCurrencyPayload = validateCurrencyPayload;
const validateIdParam = (req, res, next) => {
    try {
        currency_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
const validateUpdateCurrency = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Empty request payload",
            });
        }
        req.body = currency_validations_1.currencyUpdateSchema.parse(req.body);
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
exports.validateUpdateCurrency = validateUpdateCurrency;
