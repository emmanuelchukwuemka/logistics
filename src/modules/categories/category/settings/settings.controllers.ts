import { Request, Response } from "express";
import * as settingsServices from "./settings.services";
import { settingsSchema } from "./settings.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../../globals/utility/apiResponse";
import { categoryFlexibleSchema, categorySchema } from "../category.validations";

export const addCategory = async (req: Request, res: Response) => {

  const validatedData = categoryFlexibleSchema.parse(req.body);
  
      // Always convert to array for service
      const inputArray = Array.isArray(validatedData)
        ? validatedData
        : [validatedData];

  const result = await settingsServices.createCategory(inputArray);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 400,
      message: result.message || "Failed to create category",
    });
  }

  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await settingsServices.updateCategory(Number(id), req.body);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 400,
      message: result.message || "Failed to update category",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
    data: result.data,
  });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await settingsServices.deleteCategory(Number(id));

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "Failed to delete category",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
  });
};
