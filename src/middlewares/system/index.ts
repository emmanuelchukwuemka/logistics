import { NextFunction, Response } from "express";

module.exports.checkPayload = (err: any, res: Response, next: NextFunction) => {
  console.error("Payload Error:", err);
  if (err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ success: false, error: "Request payload size is too large" });
  }
  next(err);
};
