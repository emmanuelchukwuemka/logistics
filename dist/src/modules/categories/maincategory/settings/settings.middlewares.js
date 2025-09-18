"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.settingsSecure = void 0;
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
const validateIdParam = (paramName = "id") => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (!id || isNaN(Number(id))) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: `Invalid or missing ${paramName}`,
            });
        }
        // Am attaching numeric version for controllers
        req[`${paramName}Number`] = Number(id);
        next();
    };
};
exports.validateIdParam = validateIdParam;
