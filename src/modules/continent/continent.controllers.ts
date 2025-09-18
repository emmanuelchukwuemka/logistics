import { Request, Response } from "express";
import * as continentServices from "./continent.services";
import { ZodError } from "zod";
import { continentFlexibleSchema } from "./continent.validations";
import {
  errorResponse,
  successResponse,
} from "../../globals/utility/apiResponse";

// This method dey add both single and multiple continents
export const addContinent = async (req: Request, res: Response) => {
  try {
    const result = await continentServices.createContinent(req.body);

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err) {
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
    });
  }
};

export const getContinents = async (req: Request, res: Response) => {
  try {
    const result = await continentServices.getContinents();

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 500,
        message: result.message || "Failed to fetch continents",
      });
    }

    return successResponse(res, {
      message: "Continents fetched successfully",
      data: result.data,
    });
  } catch (error: any) {
    console.error("Get continents controller error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getContinentById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await continentServices.getContinentById(id);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "Continent not found",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Continent fetched successfully",
    data: result.data,
  });
};

export const updateContinent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await continentServices.updateContinent(id, req.body);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "Failed to update continent",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
    data: result.data,
  });
};

export const deleteContinent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const result = await continentServices.deleteContinent(id);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, {
      message: result.message,
    });
  } catch (error) {
    console.error("Controller delete continent error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Server error while deleting country",
    });
  }
};
