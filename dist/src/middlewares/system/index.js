"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.checkPayload = (err, res, next) => {
    console.error("Payload Error:", err);
    if (err.type === "entity.too.large") {
        return res
            .status(413)
            .json({ success: false, error: "Request payload size is too large" });
    }
    next(err);
};
