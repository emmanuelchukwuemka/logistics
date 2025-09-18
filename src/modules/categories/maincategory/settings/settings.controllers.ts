import { Request, Response } from "express";
import * as settingsServices from "./settings.services";
import { settingsSchema } from "./settings.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../../globals/utility/apiResponse";
import { maincategoryFlexibleSchema, maincategorySchema } from "../maincategory.validations";

export const createMaincategory = async (req: Request, res: Response) => {
  try {
    const validatedData = maincategoryFlexibleSchema.parse(req.body);

    // Always convert to array for service
    const inputArray = Array.isArray(validatedData)
      ? validatedData
      : [validatedData];

    // And here i dey call the service layer
    const result = await settingsServices.createMaincategory(inputArray);

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

export const updateMaincategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate body using schema (partial update allowed)
    const validatedData = maincategorySchema.partial().parse(req.body);

    const result = await settingsServices.updateMaincategory(
      Number(id),
      validatedData
    );

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

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

export const deleteMaincategory = async (req: Request, res: Response) => {
  try {
    const id = (req as any).idNumber;

    console.log("Id==>", id)

    const result = await settingsServices.deleteMaincategory(Number(id));

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, { message: result.message });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};