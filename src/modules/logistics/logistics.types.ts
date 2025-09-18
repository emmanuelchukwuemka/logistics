// Core User and Authentication Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'service_provider' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Auth {
  id: number;
  email: string;
  password: string;
  userId: number;
  isEmailVerified: boolean;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

// Service Provider Types
export interface ServiceProvider {
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

export interface ServiceProviderDocument {
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

// Service Types
export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ServiceType {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  isActive: boolean;
}

export interface Service {
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

export interface CoverageArea {
  id: number;
  serviceId: number;
  country: string;
  state?: string;
  city?: string;
  postalCode?: string;
  isActive: boolean;
}

export interface PricingTier {
  id: number;
  serviceId: number;
  minWeight?: number;
  maxWeight?: number;
  minDistance?: number;
  maxDistance?: number;
  price: number;
  currency: string;
  isActive: boolean;
}

// Order and Booking Types
export interface Order {
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

export interface OrderTracking {
  id: number;
  orderId: number;
  status: string;
  location?: string;
  description: string;
  timestamp: Date;
}

// Analytics Types
export interface AnalyticsData {
  totalOrders: number;
  totalRevenue: number;
  activeServiceProviders: number;
  orderCompletionRate: number;
  averageOrderValue: number;
  monthlyGrowth: number;
  topServices: Array<{
    serviceId: number;
    serviceName: string;
    orderCount: number;
    revenue: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    orderCount: number;
  }>;
}

// Notification Types
export interface Notification {
  id: number;
  userId: number;
  type: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// API Request/Response Types
export interface CreateServiceProviderRequest {
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
}

export interface CreateServiceRequest {
  serviceTypeId: number;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
}

export interface CreateOrderRequest {
  serviceId: number;
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
  notes?: string;
}

export interface UpdateOrderStatusRequest {
  status: Order['status'];
  location?: string;
  notes?: string;
}

// File Upload Types
export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter Types
export interface OrderFilters {
  status?: Order['status'];
  serviceProviderId?: number;
  customerId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface ServiceFilters {
  categoryId?: number;
  serviceTypeId?: number;
  serviceProviderId?: number;
  country?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}
