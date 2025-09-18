"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.subcategorySecure = void 0;
const subcategory_validations_1 = require("./subcategory.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const subcategorySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for subcategory module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.subcategorySecure = subcategorySecure;
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
