import { Request, Response } from "express";
import { ZodError } from "zod";
import * as logisticsServices from "./logistics.services";
import {
  createServiceProviderSchema,
  updateServiceProviderSchema,
  createServiceSchema,
  createOrderSchema,
  updateOrderStatusSchema,
  uploadDocumentSchema,
  paginationSchema,
  orderFiltersSchema,
  serviceFiltersSchema,
  analyticsQuerySchema,
} from "./logistics.validations";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

// Service Provider Controllers
export const createServiceProvider = async (req: Request, res: Response) => {
  try {
    const { body } = createServiceProviderSchema.parse({ body: req.body });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.createServiceProvider(userId, body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
      });
    }

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

export const getServiceProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.getServiceProviderByUserId(userId);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const updateServiceProviderProfile = async (req: Request, res: Response) => {
  try {
    const { body } = updateServiceProviderSchema.parse({ body: req.body });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.updateServiceProvider(userId, body);

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

// Service Management Controllers
export const createService = async (req: Request, res: Response) => {
  try {
    const { body } = createServiceSchema.parse({ body: req.body });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    // Get service provider ID from user
    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found. Please create a profile first.",
      });
    }

    const result = await logisticsServices.createService(providerResult.data!.id, body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
      });
    }

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

export const getProviderServices = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found",
      });
    }

    if (!providerResult.data) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider data not found",
      });
    }

    const result = await logisticsServices.getServicesByProvider(providerResult.data.id);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { query: paginationQuery } = paginationSchema.parse({ query: req.query });
    const { query: filterQuery } = serviceFiltersSchema.parse({ query: req.query });

    const result = await logisticsServices.getAllServices(filterQuery, paginationQuery);

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

// Order Management Controllers
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { body } = createOrderSchema.parse({ body: req.body });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.createOrder(userId, body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
      });
    }

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

export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const { query: paginationQuery } = paginationSchema.parse({ query: req.query });
    const { query: filterQuery } = orderFiltersSchema.parse({ query: req.query });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.getOrdersByCustomer(userId, filterQuery, paginationQuery);

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

export const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const { query: paginationQuery } = paginationSchema.parse({ query: req.query });
    const { query: filterQuery } = orderFiltersSchema.parse({ query: req.query });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found",
      });
    }

    if (!providerResult.data) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider data not found",
      });
    }

    const result = await logisticsServices.getOrdersByProvider(providerResult.data.id, filterQuery, paginationQuery);

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

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { body } = updateOrderStatusSchema.parse({ body: req.body });
    const { id: orderId } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found",
      });
    }

    if (!providerResult.data) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider data not found",
      });
    }

    const result = await logisticsServices.updateOrderStatus(parseInt(orderId), providerResult.data.id, body);

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

export const getOrderTracking = async (req: Request, res: Response) => {
  try {
    const { id: orderId } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.getOrderTracking(parseInt(orderId), userId);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Document Management Controllers
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { body } = uploadDocumentSchema.parse({ body: req.body });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found",
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No file uploaded",
      });
    }

    const documentData = {
      ...body,
      fileName: req.file.originalname,
      fileUrl: `/uploads/logistics/${req.file.filename}`,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
    };

    if (!providerResult.data) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider data not found",
      });
    }

    const result = await logisticsServices.uploadDocument(providerResult.data.id, documentData);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
      });
    }

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

export const getProviderDocuments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
    if (!providerResult.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider profile not found",
      });
    }

    if (!providerResult.data) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Service provider data not found",
      });
    }

    const result = await logisticsServices.getDocumentsByProvider(providerResult.data.id);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Analytics Controllers
export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const { query } = analyticsQuerySchema.parse({ query: req.query });
    const userId = (req as any).user?.id;

    let serviceProviderId: number | undefined;

    if (userId) {
      const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
      if (providerResult.success && providerResult.data) {
        serviceProviderId = providerResult.data.id;
      }
    }

    const result = await logisticsServices.getDashboardAnalytics(serviceProviderId || query.serviceProviderId);

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

// Notification Controllers
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { query } = paginationSchema.parse({ query: req.query });
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.getNotifications(userId, query);

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

export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const { id: notificationId } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Authentication required",
      });
    }

    const result = await logisticsServices.markNotificationAsRead(parseInt(notificationId), userId);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Service Categories and Types Controllers
export const getServiceCategories = async (req: Request, res: Response) => {
  try {
    const result = await logisticsServices.getServiceCategories();

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const getServiceTypes = async (req: Request, res: Response) => {
  try {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;

    const result = await logisticsServices.getServiceTypes(categoryId);

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
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
