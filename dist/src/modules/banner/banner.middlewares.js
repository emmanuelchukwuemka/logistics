"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerSecure = void 0;
const bannerSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for banner module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.bannerSecure = bannerSecure;
