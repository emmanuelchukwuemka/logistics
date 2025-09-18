import { z } from "zod";

// Service Provider Validations
export const createServiceProviderSchema = z.object({
  body: z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    businessType: z.string().min(2, "Business type is required"),
    registrationNumber: z.string().min(5, "Registration number is required"),
    taxId: z.string().optional(),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    phone: z.string().min(10, "Phone number is required"),
    website: z.string().url().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
  }),
});

export const updateServiceProviderSchema = z.object({
  body: z.object({
    companyName: z.string().min(2).optional(),
    businessType: z.string().min(2).optional(),
    registrationNumber: z.string().min(5).optional(),
    taxId: z.string().optional(),
    address: z.string().min(5).optional(),
    city: z.string().min(2).optional(),
    state: z.string().min(2).optional(),
    country: z.string().min(2).optional(),
    postalCode: z.string().min(3).optional(),
    phone: z.string().min(10).optional(),
    website: z.string().url().optional(),
    description: z.string().min(10).optional(),
  }),
});

// Service Validations
export const createServiceSchema = z.object({
  body: z.object({
    serviceTypeId: z.number().int().positive("Service type ID is required"),
    name: z.string().min(2, "Service name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    basePrice: z.number().positive("Base price must be positive"),
    currency: z.string().length(3, "Currency must be 3 characters"),
  }),
});

export const updateServiceSchema = z.object({
  body: z.object({
    serviceTypeId: z.number().int().positive().optional(),
    name: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    basePrice: z.number().positive().optional(),
    currency: z.string().length(3).optional(),
    isActive: z.boolean().optional(),
  }),
});

// Coverage Area Validations
export const createCoverageAreaSchema = z.object({
  body: z.object({
    serviceId: z.number().int().positive("Service ID is required"),
    country: z.string().min(2, "Country is required"),
    state: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
  }),
});

// Pricing Tier Validations
export const createPricingTierSchema = z.object({
  body: z.object({
    serviceId: z.number().int().positive("Service ID is required"),
    minWeight: z.number().positive().optional(),
    maxWeight: z.number().positive().optional(),
    minDistance: z.number().positive().optional(),
    maxDistance: z.number().positive().optional(),
    price: z.number().positive("Price must be positive"),
    currency: z.string().length(3, "Currency must be 3 characters"),
  }),
});

// Order Validations
export const createOrderSchema = z.object({
  body: z.object({
    serviceId: z.number().int().positive("Service ID is required"),
    pickupAddress: z.string().min(5, "Pickup address is required"),
    pickupCity: z.string().min(2, "Pickup city is required"),
    pickupState: z.string().min(2, "Pickup state is required"),
    pickupCountry: z.string().min(2, "Pickup country is required"),
    pickupPostalCode: z.string().min(3, "Pickup postal code is required"),
    pickupContactName: z.string().min(2, "Pickup contact name is required"),
    pickupContactPhone: z.string().min(10, "Pickup contact phone is required"),
    deliveryAddress: z.string().min(5, "Delivery address is required"),
    deliveryCity: z.string().min(2, "Delivery city is required"),
    deliveryState: z.string().min(2, "Delivery state is required"),
    deliveryCountry: z.string().min(2, "Delivery country is required"),
    deliveryPostalCode: z.string().min(3, "Delivery postal code is required"),
    deliveryContactName: z.string().min(2, "Delivery contact name is required"),
    deliveryContactPhone: z.string().min(10, "Delivery contact phone is required"),
    packageDescription: z.string().min(5, "Package description is required"),
    packageWeight: z.number().positive("Package weight must be positive"),
    packageDimensions: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled']),
    location: z.string().optional(),
    notes: z.string().optional(),
  }),
});

// Document Upload Validations
export const uploadDocumentSchema = z.object({
  body: z.object({
    documentType: z.enum(['business_license', 'tax_certificate', 'insurance', 'identity_proof']),
  }),
});

// Query Parameter Validations
export const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform((val: string) => parseInt(val)).refine((val: number) => val > 0, "Page must be positive").optional(),
    limit: z.string().transform((val: string) => parseInt(val)).refine((val: number) => val > 0 && val <= 100, "Limit must be between 1 and 100").optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const orderFiltersSchema = z.object({
  query: z.object({
    status: z.enum(['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled']).optional(),
    serviceProviderId: z.string().transform((val: string) => parseInt(val)).optional(),
    customerId: z.string().transform((val: string) => parseInt(val)).optional(),
    dateFrom: z.string().transform((val: string) => new Date(val)).optional(),
    dateTo: z.string().transform((val: string) => new Date(val)).optional(),
    minAmount: z.string().transform((val: string) => parseFloat(val)).optional(),
    maxAmount: z.string().transform((val: string) => parseFloat(val)).optional(),
  }),
});

export const serviceFiltersSchema = z.object({
  query: z.object({
    categoryId: z.string().transform((val: string) => parseInt(val)).optional(),
    serviceTypeId: z.string().transform((val: string) => parseInt(val)).optional(),
    serviceProviderId: z.string().transform((val: string) => parseInt(val)).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    minPrice: z.string().transform((val: string) => parseFloat(val)).optional(),
    maxPrice: z.string().transform((val: string) => parseFloat(val)).optional(),
    isActive: z.string().transform((val: string) => val === 'true').optional(),
  }),
});

// Analytics Validations
export const analyticsQuerySchema = z.object({
  query: z.object({
    startDate: z.string().transform((val: string) => new Date(val)).optional(),
    endDate: z.string().transform((val: string) => new Date(val)).optional(),
    serviceProviderId: z.string().transform((val: string) => parseInt(val)).optional(),
  }),
});

// Type exports
export type CreateServiceProviderInput = z.infer<typeof createServiceProviderSchema>;
export type UpdateServiceProviderInput = z.infer<typeof updateServiceProviderSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
