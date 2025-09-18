"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsQuerySchema = exports.serviceFiltersSchema = exports.orderFiltersSchema = exports.paginationSchema = exports.uploadDocumentSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = exports.createPricingTierSchema = exports.createCoverageAreaSchema = exports.updateServiceSchema = exports.createServiceSchema = exports.updateServiceProviderSchema = exports.createServiceProviderSchema = void 0;
const zod_1 = require("zod");
// Service Provider Validations
exports.createServiceProviderSchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string().min(2, "Company name must be at least 2 characters"),
        businessType: zod_1.z.string().min(2, "Business type is required"),
        registrationNumber: zod_1.z.string().min(5, "Registration number is required"),
        taxId: zod_1.z.string().optional(),
        address: zod_1.z.string().min(5, "Address is required"),
        city: zod_1.z.string().min(2, "City is required"),
        state: zod_1.z.string().min(2, "State is required"),
        country: zod_1.z.string().min(2, "Country is required"),
        postalCode: zod_1.z.string().min(3, "Postal code is required"),
        phone: zod_1.z.string().min(10, "Phone number is required"),
        website: zod_1.z.string().url().optional(),
        description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
    }),
});
exports.updateServiceProviderSchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string().min(2).optional(),
        businessType: zod_1.z.string().min(2).optional(),
        registrationNumber: zod_1.z.string().min(5).optional(),
        taxId: zod_1.z.string().optional(),
        address: zod_1.z.string().min(5).optional(),
        city: zod_1.z.string().min(2).optional(),
        state: zod_1.z.string().min(2).optional(),
        country: zod_1.z.string().min(2).optional(),
        postalCode: zod_1.z.string().min(3).optional(),
        phone: zod_1.z.string().min(10).optional(),
        website: zod_1.z.string().url().optional(),
        description: zod_1.z.string().min(10).optional(),
    }),
});
// Service Validations
exports.createServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceTypeId: zod_1.z.number().int().positive("Service type ID is required"),
        name: zod_1.z.string().min(2, "Service name must be at least 2 characters"),
        description: zod_1.z.string().min(10, "Description must be at least 10 characters"),
        basePrice: zod_1.z.number().positive("Base price must be positive"),
        currency: zod_1.z.string().length(3, "Currency must be 3 characters"),
    }),
});
exports.updateServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceTypeId: zod_1.z.number().int().positive().optional(),
        name: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().min(10).optional(),
        basePrice: zod_1.z.number().positive().optional(),
        currency: zod_1.z.string().length(3).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
// Coverage Area Validations
exports.createCoverageAreaSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.number().int().positive("Service ID is required"),
        country: zod_1.z.string().min(2, "Country is required"),
        state: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional(),
    }),
});
// Pricing Tier Validations
exports.createPricingTierSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.number().int().positive("Service ID is required"),
        minWeight: zod_1.z.number().positive().optional(),
        maxWeight: zod_1.z.number().positive().optional(),
        minDistance: zod_1.z.number().positive().optional(),
        maxDistance: zod_1.z.number().positive().optional(),
        price: zod_1.z.number().positive("Price must be positive"),
        currency: zod_1.z.string().length(3, "Currency must be 3 characters"),
    }),
});
// Order Validations
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.number().int().positive("Service ID is required"),
        pickupAddress: zod_1.z.string().min(5, "Pickup address is required"),
        pickupCity: zod_1.z.string().min(2, "Pickup city is required"),
        pickupState: zod_1.z.string().min(2, "Pickup state is required"),
        pickupCountry: zod_1.z.string().min(2, "Pickup country is required"),
        pickupPostalCode: zod_1.z.string().min(3, "Pickup postal code is required"),
        pickupContactName: zod_1.z.string().min(2, "Pickup contact name is required"),
        pickupContactPhone: zod_1.z.string().min(10, "Pickup contact phone is required"),
        deliveryAddress: zod_1.z.string().min(5, "Delivery address is required"),
        deliveryCity: zod_1.z.string().min(2, "Delivery city is required"),
        deliveryState: zod_1.z.string().min(2, "Delivery state is required"),
        deliveryCountry: zod_1.z.string().min(2, "Delivery country is required"),
        deliveryPostalCode: zod_1.z.string().min(3, "Delivery postal code is required"),
        deliveryContactName: zod_1.z.string().min(2, "Delivery contact name is required"),
        deliveryContactPhone: zod_1.z.string().min(10, "Delivery contact phone is required"),
        packageDescription: zod_1.z.string().min(5, "Package description is required"),
        packageWeight: zod_1.z.number().positive("Package weight must be positive"),
        packageDimensions: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
    }),
});
exports.updateOrderStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled']),
        location: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
    }),
});
// Document Upload Validations
exports.uploadDocumentSchema = zod_1.z.object({
    body: zod_1.z.object({
        documentType: zod_1.z.enum(['business_license', 'tax_certificate', 'insurance', 'identity_proof']),
    }),
});
// Query Parameter Validations
exports.paginationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().transform((val) => parseInt(val)).refine((val) => val > 0, "Page must be positive").optional(),
        limit: zod_1.z.string().transform((val) => parseInt(val)).refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100").optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
    }),
});
exports.orderFiltersSchema = zod_1.z.object({
    query: zod_1.z.object({
        status: zod_1.z.enum(['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled']).optional(),
        serviceProviderId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
        customerId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
        dateFrom: zod_1.z.string().transform((val) => new Date(val)).optional(),
        dateTo: zod_1.z.string().transform((val) => new Date(val)).optional(),
        minAmount: zod_1.z.string().transform((val) => parseFloat(val)).optional(),
        maxAmount: zod_1.z.string().transform((val) => parseFloat(val)).optional(),
    }),
});
exports.serviceFiltersSchema = zod_1.z.object({
    query: zod_1.z.object({
        categoryId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
        serviceTypeId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
        serviceProviderId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
        country: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        minPrice: zod_1.z.string().transform((val) => parseFloat(val)).optional(),
        maxPrice: zod_1.z.string().transform((val) => parseFloat(val)).optional(),
        isActive: zod_1.z.string().transform((val) => val === 'true').optional(),
    }),
});
// Analytics Validations
exports.analyticsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        startDate: zod_1.z.string().transform((val) => new Date(val)).optional(),
        endDate: zod_1.z.string().transform((val) => new Date(val)).optional(),
        serviceProviderId: zod_1.z.string().transform((val) => parseInt(val)).optional(),
    }),
});
