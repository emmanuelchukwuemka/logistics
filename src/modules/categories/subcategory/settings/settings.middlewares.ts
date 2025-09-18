import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { idParamSchema, subcategoryFlexibleSchema, subcategorySchema } from "../subcategory.validations";
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

export const validateSubcategoryCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    subcategoryFlexibleSchema.parse(req.body);
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

export const validateSubcategoryUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = subcategorySchema
      .partial()
      .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update",
      })
      .parse(req.body);

    req.body = parsed;
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

