import { Request, Response } from "express";
import * as stateServices from "./state.services";

import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createState = async (req: Request, res: Response) => {
  const result = await stateServices.createState(req.body);
  if (!result.success) return errorResponse(res, result);
  return successResponse(res, result);
};

export const updateState = async (req: Request, res: Response) => {
  const id = Number(req.params.id); // validated by middleware
  const data = req.body; // already validated and normalized

  try {
    const result = await stateServices.updateState(id, data);

    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    console.error("Update state error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to update state",
      details: error.message,
    });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await stateServices.deleteState(id);

  if (!result.success) {
    return errorResponse(res, { statusCode: 404, message: result.message });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
  });
};

export const getStates = async (_req: Request, res: Response) => {
  const result = await stateServices.getStates();
  if (!result.success) return errorResponse(res, result);
  return successResponse(res, result);
};

export const getStateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await stateServices.getStateById(id);
  if (!result.success) return errorResponse(res, result);
  return successResponse(res, result);
};

export const getStatesByCountry = async (req: Request, res: Response) => {
  const countryId = Number(req.params.id);
  const result = await stateServices.getStatesByCountry(countryId);
  if (!result.success) return errorResponse(res, result);
  return successResponse(res, result);
};

