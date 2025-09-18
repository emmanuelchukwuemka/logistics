import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {
  cityFlexibleSchema,
  cityBulkOrSingleSchema,
  idSchema,
} from "./city.validations";
import { errorResponse } from "../../globals/utility/apiResponse";

export const citySecure = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Middleware executed for city module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateCityCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No fields provided",
      });
    }

    const validatedData = cityBulkOrSingleSchema.parse(req.body);
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

export const validateCityUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please the data to update",
      });
    }

    const validatedData = cityFlexibleSchema.parse(req.body);
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
