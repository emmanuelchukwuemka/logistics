import { Request, Response, NextFunction } from "express";

export const forexSecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for forex module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
