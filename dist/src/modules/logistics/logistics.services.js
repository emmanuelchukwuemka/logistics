"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceTypes = exports.getServiceCategories = exports.markNotificationAsRead = exports.getNotifications = exports.getDashboardAnalytics = exports.getDocumentsByProvider = exports.uploadDocument = exports.getOrderTracking = exports.updateOrderStatus = exports.getOrdersByProvider = exports.getOrdersByCustomer = exports.createOrder = exports.getAllServices = exports.getServicesByProvider = exports.createService = exports.updateServiceProvider = exports.getServiceProviderByUserId = exports.createServiceProvider = void 0;
const logistics_models_1 = require("./logistics.models");
const logistics_notifications_1 = require("./logistics.notifications");
// Service Provider Services
const createServiceProvider = async (userId, data) => {
    try {
        const serviceProvider = await logistics_models_1.ServiceProvider.create({
            ...data,
            userId,
            verificationStatus: 'pending',
            isVerified: false,
        });
        return {
            success: true,
            message: "Service provider profile created successfully",
            data: serviceProvider,
        };
    }
    catch (error) {
        console.error("Create service provider error:", error);
        return {
            success: false,
            message: error.message || "Failed to create service provider profile",
        };
    }
};
exports.createServiceProvider = createServiceProvider;
const getServiceProviderByUserId = async (userId) => {
    try {
        const serviceProvider = await logistics_models_1.ServiceProvider.findOne({
            where: { userId },
            include: [
                { model: logistics_models_1.Service, as: 'services' },
                { model: logistics_models_1.ServiceProviderDocument, as: 'documents' },
            ],
        });
        if (!serviceProvider) {
            return {
                success: false,
                message: "Service provider profile not found",
            };
        }
        return {
            success: true,
            message: "Service provider profile retrieved successfully",
            data: serviceProvider,
        };
    }
    catch (error) {
        console.error("Get service provider error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve service provider profile",
        };
    }
};
exports.getServiceProviderByUserId = getServiceProviderByUserId;
const updateServiceProvider = async (userId, updates) => {
    try {
        const serviceProvider = await logistics_models_1.ServiceProvider.findOne({ where: { userId } });
        if (!serviceProvider) {
            return {
                success: false,
                message: "Service provider profile not found",
            };
        }
        await serviceProvider.update(updates);
        return {
            success: true,
            message: "Service provider profile updated successfully",
            data: serviceProvider,
        };
    }
    catch (error) {
        console.error("Update service provider error:", error);
        return {
            success: false,
            message: error.message || "Failed to update service provider profile",
        };
    }
};
exports.updateServiceProvider = updateServiceProvider;
// Service Management Services
const createService = async (serviceProviderId, data) => {
    try {
        const service = await logistics_models_1.Service.create({
            ...data,
            serviceProviderId,
        });
        return {
            success: true,
            message: "Service created successfully",
            data: service,
        };
    }
    catch (error) {
        console.error("Create service error:", error);
        return {
            success: false,
            message: error.message || "Failed to create service",
        };
    }
};
exports.createService = createService;
const getServicesByProvider = async (serviceProviderId) => {
    try {
        const services = await logistics_models_1.Service.findAll({
            where: { serviceProviderId },
            include: [
                { model: logistics_models_1.ServiceType, as: 'serviceType' },
                { model: logistics_models_1.CoverageArea, as: 'coverageAreas' },
                { model: logistics_models_1.PricingTier, as: 'pricingTiers' },
            ],
        });
        return {
            success: true,
            message: "Services retrieved successfully",
            data: services,
        };
    }
    catch (error) {
        console.error("Get services error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve services",
        };
    }
};
exports.getServicesByProvider = getServicesByProvider;
const getAllServices = async (filters = {}, pagination = {}) => {
    try {
        const { page = 1, limit = 10 } = pagination;
        const offset = (page - 1) * limit;
        const whereClause = { isActive: true };
        if (filters.categoryId)
            whereClause.serviceTypeId = filters.categoryId;
        if (filters.serviceProviderId)
            whereClause.serviceProviderId = filters.serviceProviderId;
        if (filters.country) {
            // This would need to be joined with coverage areas
        }
        const { count, rows } = await logistics_models_1.Service.findAndCountAll({
            where: whereClause,
            include: [
                { model: logistics_models_1.ServiceType, as: 'serviceType' },
                { model: logistics_models_1.ServiceProvider, as: 'serviceProvider' },
                { model: logistics_models_1.CoverageArea, as: 'coverageAreas' },
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        const result = {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
        return {
            success: true,
            message: "Services retrieved successfully",
            data: result,
        };
    }
    catch (error) {
        console.error("Get all services error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve services",
        };
    }
};
exports.getAllServices = getAllServices;
// Order Management Services
const createOrder = async (customerId, data) => {
    try {
        // Get service details to determine service provider
        const service = await logistics_models_1.Service.findByPk(data.serviceId);
        if (!service) {
            return {
                success: false,
                message: "Service not found",
            };
        }
        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        // Calculate total amount (simplified - in real app, use pricing tiers)
        const totalAmount = service.basePrice;
        const order = await logistics_models_1.Order.create({
            ...data,
            customerId,
            serviceProviderId: service.serviceProviderId,
            orderNumber,
            totalAmount,
            currency: service.currency,
            status: 'pending',
            paymentStatus: 'pending',
        });
        // Create initial tracking entry
        await logistics_models_1.OrderTracking.create({
            orderId: order.id,
            status: 'Order Created',
            description: 'Your order has been successfully created and is pending confirmation.',
            timestamp: new Date(),
        });
        // Send notifications asynchronously (don't wait for completion)
        setImmediate(async () => {
            try {
                // For now, we'll use placeholder data since we don't have direct user associations
                // In a real implementation, you'd need to join with the User model
                await (0, logistics_notifications_1.notifyOrderCreated)({
                    orderId: order.id,
                    orderNumber: order.orderNumber,
                    customerId: order.customerId,
                    customerName: 'Customer', // Would need to fetch from User model
                    customerEmail: '', // Would need to fetch from User model
                    customerPhone: order.pickupContactPhone, // Using pickup contact as fallback
                    providerEmail: '', // Would need to fetch from User model via serviceProvider
                    serviceName: service.name,
                    pickupAddress: order.pickupAddress,
                    deliveryAddress: order.deliveryAddress,
                    estimatedDelivery: order.estimatedDeliveryDate?.toISOString() || '',
                    totalAmount: order.totalAmount,
                    currency: order.currency,
                });
            }
            catch (error) {
                console.error('Failed to send order creation notifications:', error);
            }
        });
        return {
            success: true,
            message: "Order created successfully",
            data: order,
        };
    }
    catch (error) {
        console.error("Create order error:", error);
        return {
            success: false,
            message: error.message || "Failed to create order",
        };
    }
};
exports.createOrder = createOrder;
const getOrdersByCustomer = async (customerId, filters = {}, pagination = {}) => {
    try {
        const { page = 1, limit = 10 } = pagination;
        const offset = (page - 1) * limit;
        const whereClause = { customerId };
        if (filters.status)
            whereClause.status = filters.status;
        if (filters.serviceProviderId)
            whereClause.serviceProviderId = filters.serviceProviderId;
        const { count, rows } = await logistics_models_1.Order.findAndCountAll({
            where: whereClause,
            include: [
                { model: logistics_models_1.Service, as: 'service', include: [{ model: logistics_models_1.ServiceType, as: 'serviceType' }] },
                { model: logistics_models_1.ServiceProvider, as: 'serviceProvider' },
                { model: logistics_models_1.OrderTracking, as: 'tracking' },
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        const result = {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
        return {
            success: true,
            message: "Orders retrieved successfully",
            data: result,
        };
    }
    catch (error) {
        console.error("Get orders error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve orders",
        };
    }
};
exports.getOrdersByCustomer = getOrdersByCustomer;
const getOrdersByProvider = async (serviceProviderId, filters = {}, pagination = {}) => {
    try {
        const { page = 1, limit = 10 } = pagination;
        const offset = (page - 1) * limit;
        const whereClause = { serviceProviderId };
        if (filters.status)
            whereClause.status = filters.status;
        const { count, rows } = await logistics_models_1.Order.findAndCountAll({
            where: whereClause,
            include: [
                { model: logistics_models_1.Service, as: 'service', include: [{ model: logistics_models_1.ServiceType, as: 'serviceType' }] },
                { model: logistics_models_1.OrderTracking, as: 'tracking' },
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        const result = {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
        return {
            success: true,
            message: "Orders retrieved successfully",
            data: result,
        };
    }
    catch (error) {
        console.error("Get orders by provider error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve orders",
        };
    }
};
exports.getOrdersByProvider = getOrdersByProvider;
const updateOrderStatus = async (orderId, serviceProviderId, data) => {
    try {
        const order = await logistics_models_1.Order.findOne({
            where: { id: orderId, serviceProviderId },
        });
        if (!order) {
            return {
                success: false,
                message: "Order not found or access denied",
            };
        }
        await order.update({ status: data.status });
        // Create tracking entry
        await logistics_models_1.OrderTracking.create({
            orderId,
            status: data.status,
            location: data.location,
            description: data.notes || `Order status updated to ${data.status}`,
            timestamp: new Date(),
        });
        // Send notification
        await logistics_models_1.Notification.create({
            userId: order.customerId,
            type: 'push',
            title: 'Order Status Update',
            message: `Your order ${order.orderNumber} status has been updated to ${data.status}`,
            isRead: false,
            metadata: { orderId, status: data.status },
        });
        // Send email/SMS notification asynchronously
        setImmediate(async () => {
            try {
                // Fetch service name for notification
                const service = await logistics_models_1.Service.findByPk(order.serviceId);
                await (0, logistics_notifications_1.notifyOrderStatusUpdate)({
                    orderId: order.id,
                    orderNumber: order.orderNumber,
                    customerId: order.customerId,
                    customerEmail: '', // Would need to fetch from User model
                    customerPhone: order.deliveryContactPhone, // Using delivery contact as fallback
                    newStatus: data.status,
                    serviceName: service?.name || 'Service',
                    estimatedDelivery: order.estimatedDeliveryDate?.toISOString() || '',
                });
            }
            catch (error) {
                console.error('Failed to send order status update notifications:', error);
            }
        });
        return {
            success: true,
            message: "Order status updated successfully",
            data: order,
        };
    }
    catch (error) {
        console.error("Update order status error:", error);
        return {
            success: false,
            message: error.message || "Failed to update order status",
        };
    }
};
exports.updateOrderStatus = updateOrderStatus;
const getOrderTracking = async (orderId, customerId) => {
    try {
        const order = await logistics_models_1.Order.findOne({
            where: { id: orderId, customerId },
            include: [{ model: logistics_models_1.OrderTracking, as: 'tracking' }],
        });
        if (!order) {
            return {
                success: false,
                message: "Order not found",
            };
        }
        return {
            success: true,
            message: "Order tracking retrieved successfully",
            data: {
                order: order,
                tracking: order.get('tracking'),
            },
        };
    }
    catch (error) {
        console.error("Get order tracking error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve order tracking",
        };
    }
};
exports.getOrderTracking = getOrderTracking;
// Document Management Services
const uploadDocument = async (serviceProviderId, documentData) => {
    try {
        const document = await logistics_models_1.ServiceProviderDocument.create({
            serviceProviderId,
            ...documentData,
            isVerified: false,
        });
        return {
            success: true,
            message: "Document uploaded successfully",
            data: document,
        };
    }
    catch (error) {
        console.error("Upload document error:", error);
        return {
            success: false,
            message: error.message || "Failed to upload document",
        };
    }
};
exports.uploadDocument = uploadDocument;
const getDocumentsByProvider = async (serviceProviderId) => {
    try {
        const documents = await logistics_models_1.ServiceProviderDocument.findAll({
            where: { serviceProviderId },
            order: [['uploadedAt', 'DESC']],
        });
        return {
            success: true,
            message: "Documents retrieved successfully",
            data: documents,
        };
    }
    catch (error) {
        console.error("Get documents error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve documents",
        };
    }
};
exports.getDocumentsByProvider = getDocumentsByProvider;
// Analytics Services
const getDashboardAnalytics = async (serviceProviderId) => {
    try {
        const whereClause = serviceProviderId ? { serviceProviderId } : {};
        const [totalOrders, totalRevenue, activeServiceProviders, completedOrders] = await Promise.all([
            logistics_models_1.Order.count({ where: whereClause }),
            logistics_models_1.Order.sum('totalAmount', { where: { ...whereClause, paymentStatus: 'paid' } }),
            logistics_models_1.ServiceProvider.count({ where: { isVerified: true } }),
            logistics_models_1.Order.count({ where: { ...whereClause, status: 'delivered' } }),
        ]);
        const orderCompletionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const analytics = {
            totalOrders,
            totalRevenue: totalRevenue || 0,
            activeServiceProviders,
            orderCompletionRate,
            averageOrderValue,
            monthlyGrowth: 18, // Placeholder - would calculate from historical data
            topServices: [], // Would implement with complex query
            revenueByMonth: [], // Would implement with aggregation query
        };
        return {
            success: true,
            message: "Analytics retrieved successfully",
            data: analytics,
        };
    }
    catch (error) {
        console.error("Get analytics error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve analytics",
        };
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
// Notification Services
const getNotifications = async (userId, pagination = {}) => {
    try {
        const { page = 1, limit = 20 } = pagination;
        const offset = (page - 1) * limit;
        const { count, rows } = await logistics_models_1.Notification.findAndCountAll({
            where: { userId },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
        const result = {
            data: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
        return {
            success: true,
            message: "Notifications retrieved successfully",
            data: result,
        };
    }
    catch (error) {
        console.error("Get notifications error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve notifications",
        };
    }
};
exports.getNotifications = getNotifications;
const markNotificationAsRead = async (notificationId, userId) => {
    try {
        const notification = await logistics_models_1.Notification.findOne({
            where: { id: notificationId, userId },
        });
        if (!notification) {
            return {
                success: false,
                message: "Notification not found",
            };
        }
        await notification.update({ isRead: true });
        return {
            success: true,
            message: "Notification marked as read",
            data: notification,
        };
    }
    catch (error) {
        console.error("Mark notification read error:", error);
        return {
            success: false,
            message: error.message || "Failed to mark notification as read",
        };
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
// Service Categories and Types
const getServiceCategories = async () => {
    try {
        const categories = await logistics_models_1.ServiceCategory.findAll({
            where: { isActive: true },
            include: [{ model: logistics_models_1.ServiceType, as: 'serviceTypes' }],
        });
        return {
            success: true,
            message: "Service categories retrieved successfully",
            data: categories,
        };
    }
    catch (error) {
        console.error("Get service categories error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve service categories",
        };
    }
};
exports.getServiceCategories = getServiceCategories;
const getServiceTypes = async (categoryId) => {
    try {
        const whereClause = { isActive: true };
        if (categoryId) {
            whereClause.categoryId = categoryId;
        }
        const serviceTypes = await logistics_models_1.ServiceType.findAll({
            where: whereClause,
            include: [{ model: logistics_models_1.ServiceCategory, as: 'category' }],
        });
        return {
            success: true,
            message: "Service types retrieved successfully",
            data: serviceTypes,
        };
    }
    catch (error) {
        console.error("Get service types error:", error);
        return {
            success: false,
            message: error.message || "Failed to retrieve service types",
        };
    }
};
exports.getServiceTypes = getServiceTypes;
