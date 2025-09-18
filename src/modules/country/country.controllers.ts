import { Request, Response } from "express";
import * as countryServices from "./country.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";


export const createCountry = async (req: Request, res: Response) => {
  const result = await countryServices.createCountry(req.body);
  if (!result.success)
    return errorResponse(res, { statusCode: 400, message: result.message });
  return successResponse(res, {
    statusCode: 201,
    message: result.message,
    data: result.data,
  });
};

export const fetchCountries = async (req: Request, res: Response) => {
  try {
    const result = await countryServices.getCountries();

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 500,
        message: result.message,
      });
    }

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Controller fetch countries error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Server error while fetching countries",
    });
  }
};

export const fetchCountryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await countryServices.getCountryById(id);

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
    console.error("Controller fetch country by id error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Server error while fetching country",
    });
  }
};

export const fetchCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await countryServices.getCountriesByRegion(Number(id));

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
      message: "Server error while fetching countries by region",
    });
  }
};


export const updateCountry = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid country ID",
      });
    }

    const result = await countryServices.updateCountry(id, req.body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
        details: result.error ?? null,
      });
    }

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Controller updateCountry error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const result = await countryServices.deleteCountry(id);

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
    console.error("Controller delete country error:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Server error while deleting country",
    });
  }
};
