"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesSecure = void 0;
const categoriesSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for categories module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.categoriesSecure = categoriesSecure;
