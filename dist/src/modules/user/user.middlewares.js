"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSecure = void 0;
const userSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for user module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.userSecure = userSecure;
