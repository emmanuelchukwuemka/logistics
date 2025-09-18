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
exports.getCategoriesByMain = exports.fetchCategoryById = exports.getCategory = void 0;
const categoryServices = __importStar(require("./category.services"));
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const getCategory = async (req, res) => {
    try {
        const result = await categoryServices.getCategory();
        return (0, apiResponse_1.successResponse)(res, {
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
exports.getCategory = getCategory;
const fetchCategoryById = async (req, res) => {
    const { id } = req.params;
    // Validate id
    if (!id || isNaN(Number(id))) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: "Invalid or missing category ID",
        });
    }
    const result = await categoryServices.getCategoryById(Number(id));
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "Category not found",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
        data: result.data,
    });
};
exports.fetchCategoryById = fetchCategoryById;
const getCategoriesByMain = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid or missing maincategory ID",
            });
        }
        const result = await categoryServices.getCategoriesByMain(Number(id));
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            message: "Categories fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        console.error("Controller Error: getCategoriesByMain", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "An error occurred while fetching categories",
        });
    }
};
exports.getCategoriesByMain = getCategoriesByMain;
