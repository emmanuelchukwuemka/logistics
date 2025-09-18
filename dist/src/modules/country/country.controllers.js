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
exports.deleteCountry = exports.updateCountry = exports.fetchCountriesByRegion = exports.fetchCountryById = exports.fetchCountries = exports.createCountry = void 0;
const countryServices = __importStar(require("./country.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const createCountry = async (req, res) => {
    const result = await countryServices.createCountry(req.body);
    if (!result.success)
        return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.createCountry = createCountry;
const fetchCountries = async (req, res) => {
    try {
        const result = await countryServices.getCountries();
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 500,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Controller fetch countries error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server error while fetching countries",
        });
    }
};
exports.fetchCountries = fetchCountries;
const fetchCountryById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await countryServices.getCountryById(id);
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
        console.error("Controller fetch country by id error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server error while fetching country",
        });
    }
};
exports.fetchCountryById = fetchCountryById;
const fetchCountriesByRegion = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await countryServices.getCountriesByRegion(Number(id));
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
            message: "Server error while fetching countries by region",
        });
    }
};
exports.fetchCountriesByRegion = fetchCountriesByRegion;
const updateCountry = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid country ID",
            });
        }
        const result = await countryServices.updateCountry(id, req.body);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: result.message,
                details: result.error ?? null,
            });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Controller updateCountry error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Internal server error",
        });
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await countryServices.deleteCountry(id);
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
        console.error("Controller delete country error:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Server error while deleting country",
        });
    }
};
exports.deleteCountry = deleteCountry;
