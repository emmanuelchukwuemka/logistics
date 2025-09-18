import { Request, Response } from "express";
import * as regionServices from "./region.services";

import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createRegion = async (req: Request, res: Response) => {
  const result = await regionServices.createRegion(req.body);
  if (!result.success)
    return errorResponse(res, { statusCode: 400, message: result.message });
  return successResponse(res, {
    statusCode: 201,
    data: result.data,
    message: result.message,
  });
};

export const getRegions = async (req: Request, res: Response) => {
  const result = await regionServices.getRegions();
  if (!result.success)
    return errorResponse(res, {
      statusCode: 500,
      message: result.message || "Failed to fetch regions",
    });
  return successResponse(res, {
    statusCode: 200,
    data: result.data,
    message: "Regions fetched successfully",
  });
};

export const getRegionById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await regionServices.getRegionById(id);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "Region not found",
    });
  return successResponse(res, {
    statusCode: 200,
    data: result.data,
    message: "Region fetched successfully",
  });
};


export const getRegionsByContinentId = async (req: Request, res: Response) => {
  const continentId = Number(req.params.id);

  const result = await regionServices.getRegionsByContinentId(continentId);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message || "No regions found for this continent",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Regions fetched successfully",
    data: result.data,
  });
};

export const updateRegion = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await regionServices.updateRegion(id, req.body);
  if (!result.success)
    return errorResponse(res, { statusCode: 404, message: result.message });
  return successResponse(res, {
    statusCode: 200,
    data: result.data,
    message: result.message,
  });
};

export const deleteRegion = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await regionServices.deleteRegion(id);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: result.message,
  });
};