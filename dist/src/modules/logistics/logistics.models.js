"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.ServiceProviderDocument = exports.OrderTracking = exports.Order = exports.PricingTier = exports.CoverageArea = exports.Service = exports.ServiceProvider = exports.ServiceType = exports.ServiceCategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
class ServiceCategory extends sequelize_1.Model {
}
exports.ServiceCategory = ServiceCategory;
ServiceCategory.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "service_categories",
    modelName: "ServiceCategory",
    timestamps: true,
});
class ServiceType extends sequelize_1.Model {
}
exports.ServiceType = ServiceType;
ServiceType.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    categoryId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "service_types",
    modelName: "ServiceType",
    timestamps: true,
});
class ServiceProvider extends sequelize_1.Model {
}
exports.ServiceProvider = ServiceProvider;
ServiceProvider.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    companyName: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    businessType: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    registrationNumber: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    taxId: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    address: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    state: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    postalCode: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    website: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    isVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    verificationStatus: { type: sequelize_1.DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    verificationNotes: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "service_providers",
    modelName: "ServiceProvider",
    timestamps: true,
});
class Service extends sequelize_1.Model {
}
exports.Service = Service;
Service.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceProviderId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceTypeId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    basePrice: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.STRING(3), allowNull: false },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "services",
    modelName: "Service",
    timestamps: true,
});
class CoverageArea extends sequelize_1.Model {
}
exports.CoverageArea = CoverageArea;
CoverageArea.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    state: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    city: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    postalCode: { type: sequelize_1.DataTypes.STRING(20), allowNull: true },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "coverage_areas",
    modelName: "CoverageArea",
    timestamps: true,
});
class PricingTier extends sequelize_1.Model {
}
exports.PricingTier = PricingTier;
PricingTier.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    minWeight: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: true },
    maxWeight: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: true },
    minDistance: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: true },
    maxDistance: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: true },
    price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.STRING(3), allowNull: false },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "pricing_tiers",
    modelName: "PricingTier",
    timestamps: true,
});
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceProviderId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    orderNumber: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true },
    status: { type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'), defaultValue: 'pending' },
    pickupAddress: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    pickupCity: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    pickupState: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    pickupCountry: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    pickupPostalCode: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    pickupContactName: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    pickupContactPhone: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    deliveryAddress: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    deliveryCity: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    deliveryState: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    deliveryCountry: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    deliveryPostalCode: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    deliveryContactName: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    deliveryContactPhone: { type: sequelize_1.DataTypes.STRING(20), allowNull: false },
    packageDescription: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    packageWeight: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: false },
    packageDimensions: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    estimatedDeliveryDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    actualDeliveryDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    totalAmount: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.STRING(3), allowNull: false },
    paymentStatus: { type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' },
    trackingNumber: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    notes: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
});
class OrderTracking extends sequelize_1.Model {
}
exports.OrderTracking = OrderTracking;
OrderTracking.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    location: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    timestamp: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "order_tracking",
    modelName: "OrderTracking",
    timestamps: false,
});
class ServiceProviderDocument extends sequelize_1.Model {
}
exports.ServiceProviderDocument = ServiceProviderDocument;
ServiceProviderDocument.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceProviderId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    documentType: { type: sequelize_1.DataTypes.ENUM('business_license', 'tax_certificate', 'insurance', 'identity_proof'), allowNull: false },
    fileName: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    fileUrl: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    fileSize: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    mimeType: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    isVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    verificationNotes: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    uploadedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "service_provider_documents",
    modelName: "ServiceProviderDocument",
    timestamps: false,
});
class Notification extends sequelize_1.Model {
}
exports.Notification = Notification;
Notification.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    type: { type: sequelize_1.DataTypes.ENUM('email', 'sms', 'push'), allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    message: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    isRead: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    metadata: { type: sequelize_1.DataTypes.JSON, allowNull: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "notifications",
    modelName: "Notification",
    timestamps: false,
});
// Define associations
ServiceType.belongsTo(ServiceCategory, { foreignKey: 'categoryId', as: 'category' });
ServiceCategory.hasMany(ServiceType, { foreignKey: 'categoryId', as: 'serviceTypes' });
Service.belongsTo(ServiceProvider, { foreignKey: 'serviceProviderId', as: 'serviceProvider' });
ServiceProvider.hasMany(Service, { foreignKey: 'serviceProviderId', as: 'services' });
Service.belongsTo(ServiceType, { foreignKey: 'serviceTypeId', as: 'serviceType' });
ServiceType.hasMany(Service, { foreignKey: 'serviceTypeId', as: 'services' });
CoverageArea.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Service.hasMany(CoverageArea, { foreignKey: 'serviceId', as: 'coverageAreas' });
PricingTier.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Service.hasMany(PricingTier, { foreignKey: 'serviceId', as: 'pricingTiers' });
Order.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Service.hasMany(Order, { foreignKey: 'serviceId', as: 'orders' });
Order.belongsTo(ServiceProvider, { foreignKey: 'serviceProviderId', as: 'serviceProvider' });
ServiceProvider.hasMany(Order, { foreignKey: 'serviceProviderId', as: 'orders' });
OrderTracking.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
Order.hasMany(OrderTracking, { foreignKey: 'orderId', as: 'tracking' });
ServiceProviderDocument.belongsTo(ServiceProvider, { foreignKey: 'serviceProviderId', as: 'serviceProvider' });
ServiceProvider.hasMany(ServiceProviderDocument, { foreignKey: 'serviceProviderId', as: 'documents' });
exports.default = {
    ServiceCategory,
    ServiceType,
    ServiceProvider,
    Service,
    CoverageArea,
    PricingTier,
    Order,
    OrderTracking,
    ServiceProviderDocument,
    Notification,
};
