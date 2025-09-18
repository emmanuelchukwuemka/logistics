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
exports.deleteCurrency = exports.updateCurrency = exports.fetchCurrencyByCode = exports.getCurrencyById = exports.getCurrencies = exports.createCurrency = void 0;
const currencyServices = __importStar(require("./currency.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const createCurrency = async (req, res) => {
    const result = await currencyServices.createCurrency(req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.createCurrency = createCurrency;
const getCurrencies = async (req, res) => {
    const result = await currencyServices.getCurrencies();
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.getCurrencies = getCurrencies;
const getCurrencyById = async (req, res) => {
    const id = Number(req.params.id);
    const result = await currencyServices.getCurrencyById(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.getCurrencyById = getCurrencyById;
const fetchCurrencyByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await currencyServices.getCurrencyByCode(code);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error while fetching currency by code",
        });
    }
};
exports.fetchCurrencyByCode = fetchCurrencyByCode;
const updateCurrency = async (req, res) => {
    const id = Number(req.params.id);
    const result = await currencyServices.updateCurrency(id, req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.updateCurrency = updateCurrency;
const deleteCurrency = async (req, res) => {
    const id = Number(req.params.id);
    const result = await currencyServices.deleteCurrency(id);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message,
        });
    return (0, apiResponse_1.successResponse)(res, {
        message: result.message,
    });
};
exports.deleteCurrency = deleteCurrency;
