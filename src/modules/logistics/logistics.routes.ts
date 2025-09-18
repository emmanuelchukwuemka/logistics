import { Router } from "express";
import * as logisticsControllers from "./logistics.controllers";
import { authenticate } from "../auth/auth.middlewares"; // Assuming auth middleware exists
import { uploadSingle } from "./logistics.middlewares";

const router = Router();

// Service Provider Routes
router.post("/providers", authenticate, logisticsControllers.createServiceProvider);
router.get("/providers/profile", authenticate, logisticsControllers.getServiceProviderProfile);
router.put("/providers/profile", authenticate, logisticsControllers.updateServiceProviderProfile);

// Service Management Routes
router.post("/services", authenticate, logisticsControllers.createService);
router.get("/services/provider", authenticate, logisticsControllers.getProviderServices);
router.get("/services", logisticsControllers.getAllServices);

// Service Categories and Types Routes
router.get("/services/categories", logisticsControllers.getServiceCategories);
router.get("/services/types", logisticsControllers.getServiceTypes);

// Order Management Routes
router.post("/orders", authenticate, logisticsControllers.createOrder);
router.get("/orders/customer", authenticate, logisticsControllers.getCustomerOrders);
router.get("/orders/provider", authenticate, logisticsControllers.getProviderOrders);
router.put("/orders/:id/status", authenticate, logisticsControllers.updateOrderStatus);
router.get("/orders/:id/tracking", authenticate, logisticsControllers.getOrderTracking);

// Document Management Routes
router.post("/documents/upload", authenticate, uploadSingle("document"), logisticsControllers.uploadDocument);
router.get("/documents/provider", authenticate, logisticsControllers.getProviderDocuments);

// Analytics Routes
router.get("/analytics/dashboard", authenticate, logisticsControllers.getDashboardAnalytics);

// Notification Routes
router.get("/notifications", authenticate, logisticsControllers.getNotifications);
router.put("/notifications/:id/read", authenticate, logisticsControllers.markNotificationRead);

export default router;
