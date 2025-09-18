import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../globals/utility/apiResponse";
import { idSchema, stateBulkOrSingleSchema, stateFlexibleSchema, stateSchema } from "./state.validations";
import { ZodError } from "zod";

export const stateSecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for state module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

// Validate create state payload
export const validateCreatePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    stateBulkOrSingleSchema.parse(req.body);
    next();
  } catch (err: any) {
    return errorResponse(res, {
      statusCode:400,
      message: err.errors || err
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

// Validate update state payload
export const validateStateUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No fields provided to update",
      });
    }
    // Parse and validate
    const validatedData = stateFlexibleSchema.parse(req.body);

    // Normalize to array for service
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
