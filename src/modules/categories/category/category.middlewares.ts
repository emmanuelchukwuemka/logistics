import { Request, Response, NextFunction } from "express";

export const categorySecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for category module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
