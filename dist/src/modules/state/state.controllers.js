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
exports.getStatesByCountry = exports.getStateById = exports.getStates = exports.deleteState = exports.updateState = exports.createState = void 0;
const stateServices = __importStar(require("./state.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const createState = async (req, res) => {
    const result = await stateServices.createState(req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, result);
    return (0, apiResponse_1.successResponse)(res, result);
};
exports.createState = createState;
const updateState = async (req, res) => {
    const id = Number(req.params.id); // validated by middleware
    const data = req.body; // already validated and normalized
    try {
        const result = await stateServices.updateState(id, data);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Update state error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to update state",
            details: error.message,
        });
    }
};
exports.updateState = updateState;
const deleteState = async (req, res) => {
    const id = Number(req.params.id);
    const result = await stateServices.deleteState(id);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
    });
};
exports.deleteState = deleteState;
const getStates = async (_req, res) => {
    const result = await stateServices.getStates();
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, result);
    return (0, apiResponse_1.successResponse)(res, result);
};
exports.getStates = getStates;
const getStateById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await stateServices.getStateById(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, result);
    return (0, apiResponse_1.successResponse)(res, result);
};
exports.getStateById = getStateById;
const getStatesByCountry = async (req, res) => {
    const countryId = Number(req.params.id);
    const result = await stateServices.getStatesByCountry(countryId);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, result);
    return (0, apiResponse_1.successResponse)(res, result);
};
exports.getStatesByCountry = getStatesByCountry;
