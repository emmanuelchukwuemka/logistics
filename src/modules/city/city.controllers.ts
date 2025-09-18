import { Request, Response } from "express";
import * as cityServices from "./city.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createCity = async (req: Request, res: Response) => {
  const result = await cityServices.createCity(req.body);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
    data: result.data,
  });
};

export const updateCity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await cityServices.updateCity(id, req.body);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
    data: result.data,
  });
};

export const getCityById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await cityServices.getCityById(id);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
    data: result.data,
  });
};

export const getCities = async (_req: Request, res: Response) => {
  const result = await cityServices.getCities();
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
    data: result.data,
  });
};

export const fetchCitiesByState = async (req: Request, res: Response) => {
  const stateId = Number(req.params.id);
  const result = await cityServices.getCitiesByStateId(stateId);

  if (!result.success) {
    return errorResponse(res, { statusCode: 404, message: result.message });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
    data: result.data,
  });
};

export const deleteCity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await cityServices.deleteCity(id);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
  });
};
