import { Request, Response, NextFunction } from "express";
import {
  currencyFlexibleSchema,
  currencyUpdateSchema,
  idSchema,
} from "./currency.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export const currencySecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for currency module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateCurrencyPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Empty request payload",
      });
    }
    const validatedData = currencyFlexibleSchema.parse(req.body);
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

export const validateUpdateCurrency = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Empty request payload",
      });
    }

    req.body = currencyUpdateSchema.parse(req.body);
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
