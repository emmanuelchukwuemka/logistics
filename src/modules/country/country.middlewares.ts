import { Request, Response, NextFunction } from "express";
import {
  countryFlexibleSchema,
  countrySchema,
  countryUpdateFlexibleSchema,
  idSchema,
} from "./country.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export const countrySecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for country module");

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
    const validated = countryFlexibleSchema.parse(req.body);

    //const normalized = Array.isArray(validated) ? validated : [validated];

    req.body = validated;

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

export const validateCountryUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = countryUpdateFlexibleSchema.parse(req.body);
    req.body = validated;
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
