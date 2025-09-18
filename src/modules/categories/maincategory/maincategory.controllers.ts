import { Request, Response } from "express";
import * as maincategoryServices from "./maincategory.services";
import { maincategoryFlexibleSchema, maincategorySchema } from "./maincategory.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";

export const getMaincategory = async (req: Request, res: Response) => {
  try {

    const result = await maincategoryServices.getMaincategory();

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