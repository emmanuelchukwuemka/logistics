import { Request, Response, NextFunction } from "express";

export const maincategorySecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for maincategory module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
