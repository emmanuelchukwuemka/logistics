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
exports.deleteCity = exports.fetchCitiesByState = exports.getCities = exports.getCityById = exports.updateCity = exports.createCity = void 0;
const cityServices = __importStar(require("./city.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const createCity = async (req, res) => {
    const result = await cityServices.createCity(req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
        data: result.data,
    });
};
exports.createCity = createCity;
const updateCity = async (req, res) => {
    const id = Number(req.params.id);
    const result = await cityServices.updateCity(id, req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
        data: result.data,
    });
};
exports.updateCity = updateCity;
const getCityById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await cityServices.getCityById(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
        data: result.data,
    });
};
exports.getCityById = getCityById;
const getCities = async (_req, res) => {
    const result = await cityServices.getCities();
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
        data: result.data,
    });
};
exports.getCities = getCities;
const fetchCitiesByState = async (req, res) => {
    const stateId = Number(req.params.id);
    const result = await cityServices.getCitiesByStateId(stateId);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
        data: result.data,
    });
};
exports.fetchCitiesByState = fetchCitiesByState;
const deleteCity = async (req, res) => {
    const id = Number(req.params.id);
    const result = await cityServices.deleteCity(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
    });
};
exports.deleteCity = deleteCity;
