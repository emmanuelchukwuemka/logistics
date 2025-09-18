import { Request, Response } from "express";
import * as currencyServices from "./currency.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createCurrency = async (req: Request, res: Response) => {
  const result = await currencyServices.createCurrency(req.body);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 400,
      message: result.message,
    });
  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const getCurrencies = async (req: Request, res: Response) => {
  const result = await currencyServices.getCurrencies();
  if (!result.success)
    return errorResponse(res, {
      statusCode: 400,
      message: result.message,
    });
  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const getCurrencyById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await currencyServices.getCurrencyById(id);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 400,
      message: result.message,
    });
  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const fetchCurrencyByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const result = await currencyServices.getCurrencyByCode(code);

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
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error while fetching currency by code",
    });
  }
};

export const updateCurrency = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await currencyServices.updateCurrency(id, req.body);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 400,
      message: result.message,
    });
  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const deleteCurrency = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await currencyServices.deleteCurrency(id);
  if (!result.success)
    return errorResponse(res, {
      statusCode: 400,
      message: result.message,
    });
  return successResponse(res, {
    message: result.message,
  });
};
