import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { regionFlexibleSchema, idSchema, regionSchema } from "./region.validations";
import { errorResponse } from "../../globals/utility/apiResponse";
export const regionSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for region module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateRegionCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = regionFlexibleSchema.parse(req.body);
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

export const validateRegionUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const validatedData = regionSchema.partial().parse(req.body);
    req.body = validatedData;
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
