"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubcategoryUpdate = exports.validateIdParam = exports.validateSubcategoryCreate = exports.settingsSecure = void 0;
const zod_1 = require("zod");
const subcategory_validations_1 = require("../subcategory.validations");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const settingsSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for settings module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.settingsSecure = settingsSecure;
const validateSubcategoryCreate = (req, res, next) => {
    try {
        subcategory_validations_1.subcategoryFlexibleSchema.parse(req.body);
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
exports.validateSubcategoryCreate = validateSubcategoryCreate;
const validateIdParam = (req, res, next) => {
    try {
        subcategory_validations_1.idParamSchema.parse(req.params);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid ID parameter",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateIdParam = validateIdParam;
const validateSubcategoryUpdate = (req, res, next) => {
    try {
        const parsed = subcategory_validations_1.subcategorySchema
            .partial()
            .refine((data) => Object.keys(data).length > 0, {
            message: "At least one field must be provided for update",
        })
            .parse(req.body);
        req.body = parsed;
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
exports.validateSubcategoryUpdate = validateSubcategoryUpdate;
