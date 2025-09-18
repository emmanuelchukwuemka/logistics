import { Request, Response } from "express";
import * as subcategoryServices from "./subcategory.services";
import { subcategorySchema } from "./subcategory.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";

export const fetchAllSubcategories = async (req: Request, res: Response) => {
  try {
    const result = await subcategoryServices.getAllSubcategories();

    return successResponse(res, {
      statusCode: 200,
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

export const fetchSubcategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await subcategoryServices.getSubcategoryById(id);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 200,
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

export const fetchSubcategoriesByCategoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = Number(req.params.id);

    const result =
      await subcategoryServices.getSubcategoriesByCategoryId(categoryId);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 200,
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
