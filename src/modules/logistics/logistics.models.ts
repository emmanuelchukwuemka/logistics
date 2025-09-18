import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database/sequelize";

// Service Category Model
export interface ServiceCategoryAttributes {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategoryCreationAttributes extends Optional<ServiceCategoryAttributes, "id" | "createdAt" | "updatedAt"> {}

export class ServiceCategory extends Model<ServiceCategoryAttributes, ServiceCategoryCreationAttributes> implements ServiceCategoryAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceCategory.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "service_categories",
    modelName: "ServiceCategory",
    timestamps: true,
  }
);

// Service Type Model
export interface ServiceTypeAttributes {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceTypeCreationAttributes extends Optional<ServiceTypeAttributes, "id" | "createdAt" | "updatedAt"> {}

export class ServiceType extends Model<ServiceTypeAttributes, ServiceTypeCreationAttributes> implements ServiceTypeAttributes {
  public id!: number;
  public name!: string;
  public categoryId!: number;
  public description!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceType.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "service_types",
    modelName: "ServiceType",
    timestamps: true,
  }
);

// Service Provider Model
export interface ServiceProviderAttributes {
  id: number;
  userId: number;
  companyName: string;
  businessType: string;
  registrationNumber: string;
  taxId?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  website?: string;
  description: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceProviderCreationAttributes extends Optional<ServiceProviderAttributes, "id" | "createdAt" | "updatedAt"> {}

export class ServiceProvider extends Model<ServiceProviderAttributes, ServiceProviderCreationAttributes> implements ServiceProviderAttributes {
  public id!: number;
  public userId!: number;
  public companyName!: string;
  public businessType!: string;
  public registrationNumber!: string;
  public taxId?: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postalCode!: string;
  public phone!: string;
  public website?: string;
  public description!: string;
  public isVerified!: boolean;
  public verificationStatus!: 'pending' | 'approved' | 'rejected';
  public verificationNotes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceProvider.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    companyName: { type: DataTypes.STRING(255), allowNull: false },
    businessType: { type: DataTypes.STRING(100), allowNull: false },
    registrationNumber: { type: DataTypes.STRING(100), allowNull: false },
    taxId: { type: DataTypes.STRING(50), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.STRING(100), allowNull: false },
    state: { type: DataTypes.STRING(100), allowNull: false },
    country: { type: DataTypes.STRING(100), allowNull: false },
    postalCode: { type: DataTypes.STRING(20), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    website: { type: DataTypes.STRING(255), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verificationStatus: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    verificationNotes: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "service_providers",
    modelName: "ServiceProvider",
    timestamps: true,
  }
);

// Service Model
export interface ServiceAttributes {
  id: number;
  serviceProviderId: number;
  serviceTypeId: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public serviceProviderId!: number;
  public serviceTypeId!: number;
  public name!: string;
  public description!: string;
  public basePrice!: number;
  public currency!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceProviderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceTypeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    basePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "services",
    modelName: "Service",
    timestamps: true,
  }
);

// Coverage Area Model
export interface CoverageAreaAttributes {
  id: number;
  serviceId: number;
  country: string;
  state?: string;
  city?: string;
  postalCode?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoverageAreaCreationAttributes extends Optional<CoverageAreaAttributes, "id" | "createdAt" | "updatedAt"> {}

export class CoverageArea extends Model<CoverageAreaAttributes, CoverageAreaCreationAttributes> implements CoverageAreaAttributes {
  public id!: number;
  public serviceId!: number;
  public country!: string;
  public state?: string;
  public city?: string;
  public postalCode?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CoverageArea.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    country: { type: DataTypes.STRING(100), allowNull: false },
    state: { type: DataTypes.STRING(100), allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    postalCode: { type: DataTypes.STRING(20), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "coverage_areas",
    modelName: "CoverageArea",
    timestamps: true,
  }
);

// Pricing Tier Model
export interface PricingTierAttributes {
  id: number;
  serviceId: number;
  minWeight?: number;
  maxWeight?: number;
  minDistance?: number;
  maxDistance?: number;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingTierCreationAttributes extends Optional<PricingTierAttributes, "id" | "createdAt" | "updatedAt"> {}

export class PricingTier extends Model<PricingTierAttributes, PricingTierCreationAttributes> implements PricingTierAttributes {
  public id!: number;
  public serviceId!: number;
  public minWeight?: number;
  public maxWeight?: number;
  public minDistance?: number;
  public maxDistance?: number;
  public price!: number;
  public currency!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PricingTier.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    minWeight: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    maxWeight: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    minDistance: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    maxDistance: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "pricing_tiers",
    modelName: "PricingTier",
    timestamps: true,
  }
);

// Order Model
export interface OrderAttributes {
  id: number;
  customerId: number;
  serviceId: number;
  serviceProviderId: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupCountry: string;
  pickupPostalCode: string;
  pickupContactName: string;
  pickupContactPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryCountry: string;
  deliveryPostalCode: string;
  deliveryContactName: string;
  deliveryContactPhone: string;
  packageDescription: string;
  packageWeight: number;
  packageDimensions?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id" | "createdAt" | "updatedAt"> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public customerId!: number;
  public serviceId!: number;
  public serviceProviderId!: number;
  public orderNumber!: string;
  public status!: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  public pickupAddress!: string;
  public pickupCity!: string;
  public pickupState!: string;
  public pickupCountry!: string;
  public pickupPostalCode!: string;
  public pickupContactName!: string;
  public pickupContactPhone!: string;
  public deliveryAddress!: string;
  public deliveryCity!: string;
  public deliveryState!: string;
  public deliveryCountry!: string;
  public deliveryPostalCode!: string;
  public deliveryContactName!: string;
  public deliveryContactPhone!: string;
  public packageDescription!: string;
  public packageWeight!: number;
  public packageDimensions?: string;
  public estimatedDeliveryDate?: Date;
  public actualDeliveryDate?: Date;
  public totalAmount!: number;
  public currency!: string;
  public paymentStatus!: 'pending' | 'paid' | 'failed' | 'refunded';
  public trackingNumber?: string;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceProviderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    orderNumber: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'), defaultValue: 'pending' },
    pickupAddress: { type: DataTypes.TEXT, allowNull: false },
    pickupCity: { type: DataTypes.STRING(100), allowNull: false },
    pickupState: { type: DataTypes.STRING(100), allowNull: false },
    pickupCountry: { type: DataTypes.STRING(100), allowNull: false },
    pickupPostalCode: { type: DataTypes.STRING(20), allowNull: false },
    pickupContactName: { type: DataTypes.STRING(255), allowNull: false },
    pickupContactPhone: { type: DataTypes.STRING(20), allowNull: false },
    deliveryAddress: { type: DataTypes.TEXT, allowNull: false },
    deliveryCity: { type: DataTypes.STRING(100), allowNull: false },
    deliveryState: { type: DataTypes.STRING(100), allowNull: false },
    deliveryCountry: { type: DataTypes.STRING(100), allowNull: false },
    deliveryPostalCode: { type: DataTypes.STRING(20), allowNull: false },
    deliveryContactName: { type: DataTypes.STRING(255), allowNull: false },
    deliveryContactPhone: { type: DataTypes.STRING(20), allowNull: false },
    packageDescription: { type: DataTypes.TEXT, allowNull: false },
    packageWeight: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    packageDimensions: { type: DataTypes.STRING(100), allowNull: true },
    estimatedDeliveryDate: { type: DataTypes.DATE, allowNull: true },
    actualDeliveryDate: { type: DataTypes.DATE, allowNull: true },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false },
    paymentStatus: { type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' },
    trackingNumber: { type: DataTypes.STRING(50), allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
  }
);

// Order Tracking Model
export interface OrderTrackingAttributes {
  id: number;
  orderId: number;
  status: string;
  location?: string;
  description: string;
  timestamp: Date;
}

export interface OrderTrackingCreationAttributes extends Optional<OrderTrackingAttributes, "id"> {}

export class OrderTracking extends Model<OrderTrackingAttributes, OrderTrackingCreationAttributes> implements OrderTrackingAttributes {
  public id!: number;
  public orderId!: number;
  public status!: string;
  public location?: string;
  public description!: string;
  public timestamp!: Date;
}

OrderTracking.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: DataTypes.STRING(100), allowNull: false },
    location: { type: DataTypes.STRING(255), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "order_tracking",
    modelName: "OrderTracking",
    timestamps: false,
  }
);

// Service Provider Document Model
export interface ServiceProviderDocumentAttributes {
  id: number;
  serviceProviderId: number;
  documentType: 'business_license' | 'tax_certificate' | 'insurance' | 'identity_proof';
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  isVerified: boolean;
  verificationNotes?: string;
  uploadedAt: Date;
}

export interface ServiceProviderDocumentCreationAttributes extends Optional<ServiceProviderDocumentAttributes, "id"> {}

export class ServiceProviderDocument extends Model<ServiceProviderDocumentAttributes, ServiceProviderDocumentCreationAttributes> implements ServiceProviderDocumentAttributes {
  public id!: number;
  public serviceProviderId!: number;
  public documentType!: 'business_license' | 'tax_certificate' | 'insurance' | 'identity_proof';
  public fileName!: string;
  public fileUrl!: string;
  public fileSize!: number;
  public mimeType!: string;
  public isVerified!: boolean;
  public verificationNotes?: string;
  public uploadedAt!: Date;
}

ServiceProviderDocument.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    serviceProviderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    documentType: { type: DataTypes.ENUM('business_license', 'tax_certificate', 'insurance', 'identity_proof'), allowNull: false },
    fileName: { type: DataTypes.STRING(255), allowNull: false },
    fileUrl: { type: DataTypes.TEXT, allowNull: false },
    fileSize: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    mimeType: { type: DataTypes.STRING(100), allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verificationNotes: { type: DataTypes.TEXT, allowNull: true },
    uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "service_provider_documents",
    modelName: "ServiceProviderDocument",
    timestamps: false,
  }
);

// Notification Model
export interface NotificationAttributes {
  id: number;
  userId: number;
  type: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface NotificationCreationAttributes extends Optional<NotificationAttributes, "id" | "createdAt"> {}

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public userId!: number;
  public type!: 'email' | 'sms' | 'push';
  public title!: string;
  public message!: string;
  public isRead!: boolean;
  public metadata?: Record<string, any>;
  public readonly createdAt!: Date;
}

Notification.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    type: { type: DataTypes.ENUM('email', 'sms', 'push'), allowNull: false },
    title: { type: DataTypes.STRING(255), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    metadata: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "notifications",
    modelName: "Notification",
    timestamps: false,
  }
);

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

export default {
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
