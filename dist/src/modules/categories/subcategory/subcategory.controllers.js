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
exports.fetchSubcategoriesByCategoryId = exports.fetchSubcategoryById = exports.fetchAllSubcategories = void 0;
const subcategoryServices = __importStar(require("./subcategory.services"));
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const fetchAllSubcategories = async (req, res) => {
    try {
        const result = await subcategoryServices.getAllSubcategories();
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
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
exports.fetchAllSubcategories = fetchAllSubcategories;
const fetchSubcategoryById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await subcategoryServices.getSubcategoryById(id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
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
exports.fetchSubcategoryById = fetchSubcategoryById;
const fetchSubcategoriesByCategoryId = async (req, res) => {
    try {
        const categoryId = Number(req.params.id);
        const result = await subcategoryServices.getSubcategoriesByCategoryId(categoryId);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
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
exports.fetchSubcategoriesByCategoryId = fetchSubcategoriesByCategoryId;
