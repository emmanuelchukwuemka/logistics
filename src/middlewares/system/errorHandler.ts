// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 Error caught:", err);

  // Handle validation errors from Zod
  if (err instanceof ZodError) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Validation failed",
      details: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Handle custom errors that include statusCode/message
  if (err.statusCode) {
    return errorResponse(res, {
      statusCode: err.statusCode,
      message: err.message,
      details: err.details,
    });
  }

  // Default: unexpected server error
  return errorResponse(res, {
    statusCode: 500,
    message: "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
