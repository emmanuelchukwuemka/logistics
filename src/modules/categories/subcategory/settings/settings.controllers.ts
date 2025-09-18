import { Request, Response } from "express";
import * as settingsServices from "./settings.services";
import { settingsSchema } from "./settings.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../../globals/utility/apiResponse";
import { subcategoryFlexibleSchema } from "../subcategory.validations";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const validatedData = subcategoryFlexibleSchema.parse(req.body);

    // Always convert to array for service
    const inputArray = Array.isArray(validatedData)
      ? validatedData
      : [validatedData];

    // And here i dey call the service layer
    const result = await settingsServices.createSubcategory(inputArray);

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

export const updateSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

   const result = await settingsServices.updateSubcategory(
     Number(id),
     req.body
   );


    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message || "Failed to update subcategory",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid request",
      details: error,
    });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await settingsServices.deleteSubcategory(Number(id));

    if (!deleted) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Subcategory not found",
      });
    }

    return successResponse(res, {
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error("Delete Subcategory Error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to delete subcategory",
    });
  }
};

