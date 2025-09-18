import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../../../globals/utility/apiResponse";

export const settingsSecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for settings module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateIdParam = (paramName: string = "id") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id || isNaN(Number(id))) {
      return errorResponse(res, {
        statusCode: 400,
        message: `Invalid or missing ${paramName}`,
      });
    }

    // Am attaching numeric version for controllers
    (req as any)[`${paramName}Number`] = Number(id);

    next();
  };
};