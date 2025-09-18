import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  ServiceProvider,
  Service,
  Order,
  OrderTracking,
  ServiceProviderDocument,
  Notification,
  ServiceCategory,
  ServiceType,
  CoverageArea,
  PricingTier,
} from "./logistics.models";
import {
  CreateServiceProviderRequest,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  AnalyticsData,
  PaginatedResponse,
  OrderFilters,
  ServiceFilters,
} from "./logistics.types";
import {
  notifyOrderCreated,
  notifyOrderStatusUpdate,
  notifyServiceProviderVerification,
  notifyServiceProviderApproved,
} from "./logistics.notifications";

// Service Provider Services
export const createServiceProvider = async (userId: number, data: CreateServiceProviderRequest) => {
  try {
    const serviceProvider = await ServiceProvider.create({
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
  } catch (error: any) {
    console.error("Create service provider error:", error);
    return {
      success: false,
      message: error.message || "Failed to create service provider profile",
    };
  }
};

export const getServiceProviderByUserId = async (userId: number) => {
  try {
    const serviceProvider = await ServiceProvider.findOne({
      where: { userId },
      include: [
        { model: Service, as: 'services' },
        { model: ServiceProviderDocument, as: 'documents' },
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
  } catch (error: any) {
    console.error("Get service provider error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve service provider profile",
    };
  }
};

export const updateServiceProvider = async (userId: number, updates: Partial<CreateServiceProviderRequest>) => {
  try {
    const serviceProvider = await ServiceProvider.findOne({ where: { userId } });

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
  } catch (error: any) {
    console.error("Update service provider error:", error);
    return {
      success: false,
      message: error.message || "Failed to update service provider profile",
    };
  }
};

// Service Management Services
export const createService = async (serviceProviderId: number, data: any) => {
  try {
    const service = await Service.create({
      ...data,
      serviceProviderId,
    });

    return {
      success: true,
      message: "Service created successfully",
      data: service,
    };
  } catch (error: any) {
    console.error("Create service error:", error);
    return {
      success: false,
      message: error.message || "Failed to create service",
    };
  }
};

export const getServicesByProvider = async (serviceProviderId: number) => {
  try {
    const services = await Service.findAll({
      where: { serviceProviderId },
      include: [
        { model: ServiceType, as: 'serviceType' },
        { model: CoverageArea, as: 'coverageAreas' },
        { model: PricingTier, as: 'pricingTiers' },
      ],
    });

    return {
      success: true,
      message: "Services retrieved successfully",
      data: services,
    };
  } catch (error: any) {
    console.error("Get services error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve services",
    };
  }
};

export const getAllServices = async (filters: ServiceFilters = {}, pagination: any = {}) => {
  try {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const whereClause: any = { isActive: true };

    if (filters.categoryId) whereClause.serviceTypeId = filters.categoryId;
    if (filters.serviceProviderId) whereClause.serviceProviderId = filters.serviceProviderId;
    if (filters.country) {
      // This would need to be joined with coverage areas
    }

    const { count, rows } = await Service.findAndCountAll({
      where: whereClause,
      include: [
        { model: ServiceType, as: 'serviceType' },
        { model: ServiceProvider, as: 'serviceProvider' },
        { model: CoverageArea, as: 'coverageAreas' },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const result: PaginatedResponse<any> = {
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
  } catch (error: any) {
    console.error("Get all services error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve services",
    };
  }
};

// Order Management Services
export const createOrder = async (customerId: number, data: CreateOrderRequest) => {
  try {
    // Get service details to determine service provider
    const service = await Service.findByPk(data.serviceId);
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

    const order = await Order.create({
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
    await OrderTracking.create({
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
        await notifyOrderCreated({
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
      } catch (error) {
        console.error('Failed to send order creation notifications:', error);
      }
    });

    return {
      success: true,
      message: "Order created successfully",
      data: order,
    };
  } catch (error: any) {
    console.error("Create order error:", error);
    return {
      success: false,
      message: error.message || "Failed to create order",
    };
  }
};

export const getOrdersByCustomer = async (customerId: number, filters: OrderFilters = {}, pagination: any = {}) => {
  try {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const whereClause: any = { customerId };

    if (filters.status) whereClause.status = filters.status;
    if (filters.serviceProviderId) whereClause.serviceProviderId = filters.serviceProviderId;

    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        { model: Service, as: 'service', include: [{ model: ServiceType, as: 'serviceType' }] },
        { model: ServiceProvider, as: 'serviceProvider' },
        { model: OrderTracking, as: 'tracking' },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const result: PaginatedResponse<any> = {
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
  } catch (error: any) {
    console.error("Get orders error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve orders",
    };
  }
};

export const getOrdersByProvider = async (serviceProviderId: number, filters: OrderFilters = {}, pagination: any = {}) => {
  try {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const whereClause: any = { serviceProviderId };

    if (filters.status) whereClause.status = filters.status;

    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        { model: Service, as: 'service', include: [{ model: ServiceType, as: 'serviceType' }] },
        { model: OrderTracking, as: 'tracking' },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const result: PaginatedResponse<any> = {
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
  } catch (error: any) {
    console.error("Get orders by provider error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve orders",
    };
  }
};

export const updateOrderStatus = async (orderId: number, serviceProviderId: number, data: UpdateOrderStatusRequest) => {
  try {
    const order = await Order.findOne({
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
    await OrderTracking.create({
      orderId,
      status: data.status,
      location: data.location,
      description: data.notes || `Order status updated to ${data.status}`,
      timestamp: new Date(),
    });

    // Send notification
    await Notification.create({
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
        const service = await Service.findByPk(order.serviceId);
        await notifyOrderStatusUpdate({
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerId: order.customerId,
          customerEmail: '', // Would need to fetch from User model
          customerPhone: order.deliveryContactPhone, // Using delivery contact as fallback
          newStatus: data.status,
          serviceName: service?.name || 'Service',
          estimatedDelivery: order.estimatedDeliveryDate?.toISOString() || '',
        });
      } catch (error) {
        console.error('Failed to send order status update notifications:', error);
      }
    });

    return {
      success: true,
      message: "Order status updated successfully",
      data: order,
    };
  } catch (error: any) {
    console.error("Update order status error:", error);
    return {
      success: false,
      message: error.message || "Failed to update order status",
    };
  }
};

export const getOrderTracking = async (orderId: number, customerId: number) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId, customerId },
      include: [{ model: OrderTracking, as: 'tracking' }],
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
  } catch (error: any) {
    console.error("Get order tracking error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve order tracking",
    };
  }
};

// Document Management Services
export const uploadDocument = async (serviceProviderId: number, documentData: any) => {
  try {
    const document = await ServiceProviderDocument.create({
      serviceProviderId,
      ...documentData,
      isVerified: false,
    });

    return {
      success: true,
      message: "Document uploaded successfully",
      data: document,
    };
  } catch (error: any) {
    console.error("Upload document error:", error);
    return {
      success: false,
      message: error.message || "Failed to upload document",
    };
  }
};

export const getDocumentsByProvider = async (serviceProviderId: number) => {
  try {
    const documents = await ServiceProviderDocument.findAll({
      where: { serviceProviderId },
      order: [['uploadedAt', 'DESC']],
    });

    return {
      success: true,
      message: "Documents retrieved successfully",
      data: documents,
    };
  } catch (error: any) {
    console.error("Get documents error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve documents",
    };
  }
};

// Analytics Services
export const getDashboardAnalytics = async (serviceProviderId?: number) => {
  try {
    const whereClause = serviceProviderId ? { serviceProviderId } : {};

    const [totalOrders, totalRevenue, activeServiceProviders, completedOrders] = await Promise.all([
      Order.count({ where: whereClause }),
      Order.sum('totalAmount', { where: { ...whereClause, paymentStatus: 'paid' } }),
      ServiceProvider.count({ where: { isVerified: true } }),
      Order.count({ where: { ...whereClause, status: 'delivered' } }),
    ]);

    const orderCompletionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const analytics: AnalyticsData = {
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
  } catch (error: any) {
    console.error("Get analytics error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve analytics",
    };
  }
};

// Notification Services
export const getNotifications = async (userId: number, pagination: any = {}) => {
  try {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const { count, rows } = await Notification.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const result: PaginatedResponse<any> = {
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
  } catch (error: any) {
    console.error("Get notifications error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve notifications",
    };
  }
};

export const markNotificationAsRead = async (notificationId: number, userId: number) => {
  try {
    const notification = await Notification.findOne({
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
  } catch (error: any) {
    console.error("Mark notification read error:", error);
    return {
      success: false,
      message: error.message || "Failed to mark notification as read",
    };
  }
};

// Service Categories and Types
export const getServiceCategories = async () => {
  try {
    const categories = await ServiceCategory.findAll({
      where: { isActive: true },
      include: [{ model: ServiceType, as: 'serviceTypes' }],
    });

    return {
      success: true,
      message: "Service categories retrieved successfully",
      data: categories,
    };
  } catch (error: any) {
    console.error("Get service categories error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve service categories",
    };
  }
};

export const getServiceTypes = async (categoryId?: number) => {
  try {
    const whereClause: any = { isActive: true };
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const serviceTypes = await ServiceType.findAll({
      where: whereClause,
      include: [{ model: ServiceCategory, as: 'category' }],
    });

    return {
      success: true,
      message: "Service types retrieved successfully",
      data: serviceTypes,
    };
  } catch (error: any) {
    console.error("Get service types error:", error);
    return {
      success: false,
      message: error.message || "Failed to retrieve service types",
    };
  }
};
