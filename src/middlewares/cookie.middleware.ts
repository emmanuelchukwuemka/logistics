import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ success:false, message: "Unauthorized", statusCode:401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
