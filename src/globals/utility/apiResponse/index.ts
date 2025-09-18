import { Response } from "express";

interface ApiResponse<T = any> {
  statusCode?: number;
  message: string;
  data?: T;
  details?: any;
}

export function successResponse<T>(
  res: Response,
  { statusCode = 200, message, data }: ApiResponse<T>
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  { statusCode = 500, message, details }: ApiResponse
) {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details,
  });
}
