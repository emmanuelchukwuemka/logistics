import { Request, Response } from "express";
import { fetchAndUpdateRates } from "./forex.services";
import * as forexServices from "./forex.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const updateExchangeRates = async (req: Request, res: Response) => {
  try {
    const result = await fetchAndUpdateRates();

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 500,
        message: result.message || "Failed to update exchange rates",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
    });
  } catch (err) {
    console.error("Controller Error:", err);
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected server error",
    });
  }
};

export const getExchangeRates = async (req: Request, res: Response) => {
  try {
    const result = await forexServices.getExchangerates();

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 500,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    console.error("Controller Error:", err);
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected server error",
    });
  }
};

export const getExchangeRatesByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const result = await forexServices.getExchangeRatesByCode(code);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 500,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    console.error("Controller Error:", err);
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected server error",
    });
  }
};
