import { Request, Response, NextFunction } from "express";
import { categoryFlexibleSchema, categorySchema, idParamSchema } from "../category.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../../globals/utility/apiResponse";

export const settingsSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for settings module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateCategoryCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryFlexibleSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};


export const validateCategoryUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // am allowing for partial updates
    const parsedData = categorySchema.partial().parse(req.body);
    req.body = parsedData; // here, this will overwrite with validated data
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors || error.message,
    });
  }
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    idParamSchema.parse(req.params); // parses { id: "123" }
    next();
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 400,
      message: err.errors?.[0]?.message || "Invalid ID parameter",
    });
  }
};