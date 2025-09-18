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
exports.deleteRegion = exports.updateRegion = exports.getRegionsByContinentId = exports.getRegionById = exports.getRegions = exports.createRegion = void 0;
const regionServices = __importStar(require("./region.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const createRegion = async (req, res) => {
    const result = await regionServices.createRegion(req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        data: result.data,
        message: result.message,
    });
};
exports.createRegion = createRegion;
const getRegions = async (req, res) => {
    const result = await regionServices.getRegions();
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: result.message || "Failed to fetch regions",
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        data: result.data,
        message: "Regions fetched successfully",
    });
};
exports.getRegions = getRegions;
const getRegionById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await regionServices.getRegionById(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "Region not found",
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        data: result.data,
        message: "Region fetched successfully",
    });
};
exports.getRegionById = getRegionById;
const getRegionsByContinentId = async (req, res) => {
    const continentId = Number(req.params.id);
    const result = await regionServices.getRegionsByContinentId(continentId);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "No regions found for this continent",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: "Regions fetched successfully",
        data: result.data,
    });
};
exports.getRegionsByContinentId = getRegionsByContinentId;
const updateRegion = async (req, res) => {
    const id = Number(req.params.id);
    const result = await regionServices.updateRegion(id, req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        data: result.data,
        message: result.message,
    });
};
exports.updateRegion = updateRegion;
const deleteRegion = async (req, res) => {
    const id = Number(req.params.id);
    const result = await regionServices.deleteRegion(id);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
    });
};
exports.deleteRegion = deleteRegion;
