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
const express_1 = require("express");
const logisticsControllers = __importStar(require("./logistics.controllers"));
const auth_middlewares_1 = require("../auth/auth.middlewares"); // Assuming auth middleware exists
const logistics_middlewares_1 = require("./logistics.middlewares");
const router = (0, express_1.Router)();
// Service Provider Routes
router.post("/providers", auth_middlewares_1.authenticate, logisticsControllers.createServiceProvider);
router.get("/providers/profile", auth_middlewares_1.authenticate, logisticsControllers.getServiceProviderProfile);
router.put("/providers/profile", auth_middlewares_1.authenticate, logisticsControllers.updateServiceProviderProfile);
// Service Management Routes
router.post("/services", auth_middlewares_1.authenticate, logisticsControllers.createService);
router.get("/services/provider", auth_middlewares_1.authenticate, logisticsControllers.getProviderServices);
router.get("/services", logisticsControllers.getAllServices);
// Service Categories and Types Routes
router.get("/services/categories", logisticsControllers.getServiceCategories);
router.get("/services/types", logisticsControllers.getServiceTypes);
// Order Management Routes
router.post("/orders", auth_middlewares_1.authenticate, logisticsControllers.createOrder);
router.get("/orders/customer", auth_middlewares_1.authenticate, logisticsControllers.getCustomerOrders);
router.get("/orders/provider", auth_middlewares_1.authenticate, logisticsControllers.getProviderOrders);
router.put("/orders/:id/status", auth_middlewares_1.authenticate, logisticsControllers.updateOrderStatus);
router.get("/orders/:id/tracking", auth_middlewares_1.authenticate, logisticsControllers.getOrderTracking);
// Document Management Routes
router.post("/documents/upload", auth_middlewares_1.authenticate, (0, logistics_middlewares_1.uploadSingle)("document"), logisticsControllers.uploadDocument);
router.get("/documents/provider", auth_middlewares_1.authenticate, logisticsControllers.getProviderDocuments);
// Analytics Routes
router.get("/analytics/dashboard", auth_middlewares_1.authenticate, logisticsControllers.getDashboardAnalytics);
// Notification Routes
router.get("/notifications", auth_middlewares_1.authenticate, logisticsControllers.getNotifications);
router.put("/notifications/:id/read", auth_middlewares_1.authenticate, logisticsControllers.markNotificationRead);
exports.default = router;
