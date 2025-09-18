import { Request, Response, NextFunction } from "express";
import { continentFlexibleSchema, continentSchema, idSchema } from "./continent.validations";
import { errorResponse } from "../../globals/utility/apiResponse";
import { ZodError } from "zod";

export const continentSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for continent module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateCreatePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    continentFlexibleSchema.parse(req.body);
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
    idSchema.parse({ id: Number(req.params.id) });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};

export const validateContinentUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = continentFlexibleSchema.parse(req.body);
    req.body = Array.isArray(validatedData) ? validatedData : [validatedData];
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

