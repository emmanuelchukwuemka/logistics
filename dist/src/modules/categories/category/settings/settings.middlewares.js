"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validateCategoryUpdate = exports.validateCategoryCreate = exports.settingsSecure = void 0;
const category_validations_1 = require("../category.validations");
const zod_1 = require("zod");
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
const validateCategoryCreate = (req, res, next) => {
    try {
        category_validations_1.categoryFlexibleSchema.parse(req.body);
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
exports.validateCategoryCreate = validateCategoryCreate;
const validateCategoryUpdate = (req, res, next) => {
    try {
        // am allowing for partial updates
        const parsedData = category_validations_1.categorySchema.partial().parse(req.body);
        req.body = parsedData; // here, this will overwrite with validated data
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.errors || error.message,
        });
    }
};
exports.validateCategoryUpdate = validateCategoryUpdate;
const validateIdParam = (req, res, next) => {
    try {
        category_validations_1.idParamSchema.parse(req.params); // parses { id: "123" }
        next();
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: err.errors?.[0]?.message || "Invalid ID parameter",
        });
    }
};
exports.validateIdParam = validateIdParam;
