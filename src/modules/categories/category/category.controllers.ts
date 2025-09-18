import { Request, Response } from "express";
import * as categoryServices from "./category.services";
import { categorySchema } from "./category.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryServices.getCategory();

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

export const fetchCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate id
  if (!id || isNaN(Number(id))) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid or missing category ID",
    });
  }

  const result = await categoryServices.getCategoryById(Number(id));

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "Category not found",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
    data: result.data,
  });
};

export const getCategoriesByMain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid or missing maincategory ID",
      });
    }

    const result = await categoryServices.getCategoriesByMain(Number(id));

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("Controller Error: getCategoriesByMain", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "An error occurred while fetching categories",
    });
  }
};