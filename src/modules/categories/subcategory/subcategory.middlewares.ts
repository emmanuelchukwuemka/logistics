import { Request, Response, NextFunction } from "express";
import { idParamSchema } from "./subcategory.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../globals/utility/apiResponse";

export const subcategorySecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for subcategory module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
        details: err.issues,
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};