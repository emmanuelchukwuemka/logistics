"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCityUpdate = exports.validateIdParam = exports.validateCityCreate = exports.citySecure = void 0;
const zod_1 = require("zod");
const city_validations_1 = require("./city.validations");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const citySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for city module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.citySecure = citySecure;
const validateCityCreate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided",
            });
        }
        const validatedData = city_validations_1.cityBulkOrSingleSchema.parse(req.body);
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
exports.validateCityCreate = validateCityCreate;
const validateIdParam = (req, res, next) => {
    try {
        city_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
const validateCityUpdate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Please the data to update",
            });
        }
        const validatedData = city_validations_1.cityFlexibleSchema.parse(req.body);
        req.body = validatedData;
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
exports.validateCityUpdate = validateCityUpdate;
