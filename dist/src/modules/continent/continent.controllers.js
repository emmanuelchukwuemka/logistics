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
exports.deleteContinent = exports.updateContinent = exports.getContinentById = exports.getContinents = exports.addContinent = void 0;
const continentServices = __importStar(require("./continent.services"));
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
// This method dey add both single and multiple continents
const addContinent = async (req, res) => {
    try {
        const result = await continentServices.createContinent(req.body);
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
        });
    }
};
exports.addContinent = addContinent;
const getContinents = async (req, res) => {
    try {
        const result = await continentServices.getContinents();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message || "Failed to fetch continents",
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: "Continents fetched successfully",
            data: result.data,
        });
    }
    catch (error) {
        console.error("Get continents controller error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
    }
};
exports.getContinents = getContinents;
const getContinentById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await continentServices.getContinentById(id);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "Continent not found",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: "Continent fetched successfully",
        data: result.data,
    });
};
exports.getContinentById = getContinentById;
const updateContinent = async (req, res) => {
    const id = Number(req.params.id);
    const result = await continentServices.updateContinent(id, req.body);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "Failed to update continent",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
        data: result.data,
    });
};
exports.updateContinent = updateContinent;
const deleteContinent = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await continentServices.deleteContinent(id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
        });
    }
    catch (error) {
        console.error("Controller delete continent error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server error while deleting country",
        });
    }
};
exports.deleteContinent = deleteContinent;
