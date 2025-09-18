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
exports.getExchangeRatesByCode = exports.getExchangeRates = exports.updateExchangeRates = void 0;
const forex_services_1 = require("./forex.services");
const forexServices = __importStar(require("./forex.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const updateExchangeRates = async (req, res) => {
    try {
        const result = await (0, forex_services_1.fetchAndUpdateRates)();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message || "Failed to update exchange rates",
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            message: result.message,
        });
    }
    catch (err) {
        console.error("Controller Error:", err);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected server error",
        });
    }
};
exports.updateExchangeRates = updateExchangeRates;
const getExchangeRates = async (req, res) => {
    try {
        const result = await forexServices.getExchangerates();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
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
        console.error("Controller Error:", err);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected server error",
        });
    }
};
exports.getExchangeRates = getExchangeRates;
const getExchangeRatesByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await forexServices.getExchangeRatesByCode(code);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
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
        console.error("Controller Error:", err);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected server error",
        });
    }
};
exports.getExchangeRatesByCode = getExchangeRatesByCode;
