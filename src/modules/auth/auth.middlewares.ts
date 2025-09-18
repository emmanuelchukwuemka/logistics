import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { loginSchema } from "./auth.validations";

export const authSecure = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Middleware executed for auth module");

    // validate request body
    req.body = loginSchema.parse(req.body);

    next();
  } catch (err: any) {
    console.log("Error in authSecure:", err)
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: err.errors ?? err.issues,
    });
  }
};

// JWT Authentication Middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Attach user info to request
    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error: any) {
    console.log("JWT verification error:", error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};
