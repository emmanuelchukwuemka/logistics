import { Request, Response } from "express";
import * as userServices from "./user.services";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";
import { signupSchema } from "./user.validations";

export const signupController = async (req: Request, res: Response) => {
  try {
    // For here, am validating request body using Zod
    const validatedData = signupSchema.parse(req.body);

    // And here i dey call the service layer
    const result = await userServices.signupService(validatedData);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
   if (!req.user || !req.user.id) {
     return errorResponse(res, {
       statusCode: 401,
       message: "Unauthorized",
     });
   }

   const result = await userServices.profile(req.user.id);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Profile validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}
