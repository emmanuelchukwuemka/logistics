"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceTypes = exports.getServiceCategories = exports.markNotificationRead = exports.getNotifications = exports.getDashboardAnalytics = exports.getProviderDocuments = exports.uploadDocument = exports.getOrderTracking = exports.updateOrderStatus = exports.getProviderOrders = exports.getCustomerOrders = exports.createOrder = exports.getAllServices = exports.getProviderServices = exports.createService = exports.updateServiceProviderProfile = exports.getServiceProviderProfile = exports.createServiceProvider = void 0;
const zod_1 = require("zod");
const logisticsServices = __importStar(require("./logistics.services"));
const logistics_validations_1 = require("./logistics.validations");
const apiResponse_1 = require("../../globals/utility/apiResponse");
// Service Provider Controllers
const createServiceProvider = async (req, res) => {
    try {
        const { body } = logistics_validations_1.createServiceProviderSchema.parse({ body: req.body });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.createServiceProvider(userId, body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.createServiceProvider = createServiceProvider;
const getServiceProviderProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.getServiceProviderByUserId(userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getServiceProviderProfile = getServiceProviderProfile;
const updateServiceProviderProfile = async (req, res) => {
    try {
        const { body } = logistics_validations_1.updateServiceProviderSchema.parse({ body: req.body });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.updateServiceProvider(userId, body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.updateServiceProviderProfile = updateServiceProviderProfile;
// Service Management Controllers
const createService = async (req, res) => {
    try {
        const { body } = logistics_validations_1.createServiceSchema.parse({ body: req.body });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        // Get service provider ID from user
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found. Please create a profile first.",
            });
        }
        const result = await logisticsServices.createService(providerResult.data.id, body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.createService = createService;
const getProviderServices = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found",
            });
        }
        if (!providerResult.data) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider data not found",
            });
        }
        const result = await logisticsServices.getServicesByProvider(providerResult.data.id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getProviderServices = getProviderServices;
const getAllServices = async (req, res) => {
    try {
        const { query: paginationQuery } = logistics_validations_1.paginationSchema.parse({ query: req.query });
        const { query: filterQuery } = logistics_validations_1.serviceFiltersSchema.parse({ query: req.query });
        const result = await logisticsServices.getAllServices(filterQuery, paginationQuery);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getAllServices = getAllServices;
// Order Management Controllers
const createOrder = async (req, res) => {
    try {
        const { body } = logistics_validations_1.createOrderSchema.parse({ body: req.body });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.createOrder(userId, body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.createOrder = createOrder;
const getCustomerOrders = async (req, res) => {
    try {
        const { query: paginationQuery } = logistics_validations_1.paginationSchema.parse({ query: req.query });
        const { query: filterQuery } = logistics_validations_1.orderFiltersSchema.parse({ query: req.query });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.getOrdersByCustomer(userId, filterQuery, paginationQuery);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getCustomerOrders = getCustomerOrders;
const getProviderOrders = async (req, res) => {
    try {
        const { query: paginationQuery } = logistics_validations_1.paginationSchema.parse({ query: req.query });
        const { query: filterQuery } = logistics_validations_1.orderFiltersSchema.parse({ query: req.query });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found",
            });
        }
        if (!providerResult.data) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider data not found",
            });
        }
        const result = await logisticsServices.getOrdersByProvider(providerResult.data.id, filterQuery, paginationQuery);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getProviderOrders = getProviderOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { body } = logistics_validations_1.updateOrderStatusSchema.parse({ body: req.body });
        const { id: orderId } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found",
            });
        }
        if (!providerResult.data) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider data not found",
            });
        }
        const result = await logisticsServices.updateOrderStatus(parseInt(orderId), providerResult.data.id, body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getOrderTracking = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.getOrderTracking(parseInt(orderId), userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getOrderTracking = getOrderTracking;
// Document Management Controllers
const uploadDocument = async (req, res) => {
    try {
        const { body } = logistics_validations_1.uploadDocumentSchema.parse({ body: req.body });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found",
            });
        }
        // Check if file was uploaded
        if (!req.file) {
            return (0, apiResponse_1.errorResponse)(res, {
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
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider data not found",
            });
        }
        const result = await logisticsServices.uploadDocument(providerResult.data.id, documentData);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.uploadDocument = uploadDocument;
const getProviderDocuments = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
        if (!providerResult.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider profile not found",
            });
        }
        if (!providerResult.data) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: "Service provider data not found",
            });
        }
        const result = await logisticsServices.getDocumentsByProvider(providerResult.data.id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getProviderDocuments = getProviderDocuments;
// Analytics Controllers
const getDashboardAnalytics = async (req, res) => {
    try {
        const { query } = logistics_validations_1.analyticsQuerySchema.parse({ query: req.query });
        const userId = req.user?.id;
        let serviceProviderId;
        if (userId) {
            const providerResult = await logisticsServices.getServiceProviderByUserId(userId);
            if (providerResult.success && providerResult.data) {
                serviceProviderId = providerResult.data.id;
            }
        }
        const result = await logisticsServices.getDashboardAnalytics(serviceProviderId || query.serviceProviderId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
// Notification Controllers
const getNotifications = async (req, res) => {
    try {
        const { query } = logistics_validations_1.paginationSchema.parse({ query: req.query });
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.getNotifications(userId, query);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getNotifications = getNotifications;
const markNotificationRead = async (req, res) => {
    try {
        const { id: notificationId } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 401,
                message: "Authentication required",
            });
        }
        const result = await logisticsServices.markNotificationAsRead(parseInt(notificationId), userId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.markNotificationRead = markNotificationRead;
// Service Categories and Types Controllers
const getServiceCategories = async (req, res) => {
    try {
        const result = await logisticsServices.getServiceCategories();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getServiceCategories = getServiceCategories;
const getServiceTypes = async (req, res) => {
    try {
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : undefined;
        const result = await logisticsServices.getServiceTypes(categoryId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.getServiceTypes = getServiceTypes;
