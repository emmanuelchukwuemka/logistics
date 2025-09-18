"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegionUpdate = exports.validateIdParam = exports.validateRegionCreate = exports.regionSecure = void 0;
const zod_1 = require("zod");
const region_validations_1 = require("./region.validations");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const regionSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for region module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.regionSecure = regionSecure;
const validateRegionCreate = (req, res, next) => {
    try {
        const validatedData = region_validations_1.regionFlexibleSchema.parse(req.body);
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
exports.validateRegionCreate = validateRegionCreate;
const validateIdParam = (req, res, next) => {
    try {
        region_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
const validateRegionUpdate = (req, res, next) => {
    try {
        const validatedData = region_validations_1.regionSchema.partial().parse(req.body);
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
exports.validateRegionUpdate = validateRegionUpdate;
