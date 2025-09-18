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
exports.deleteMaincategory = exports.updateMaincategory = exports.createMaincategory = void 0;
const settingsServices = __importStar(require("./settings.services"));
const zod_1 = require("zod");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const maincategory_validations_1 = require("../maincategory.validations");
const createMaincategory = async (req, res) => {
    try {
        const validatedData = maincategory_validations_1.maincategoryFlexibleSchema.parse(req.body);
        // Always convert to array for service
        const inputArray = Array.isArray(validatedData)
            ? validatedData
            : [validatedData];
        // And here i dey call the service layer
        const result = await settingsServices.createMaincategory(inputArray);
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
exports.createMaincategory = createMaincategory;
const updateMaincategory = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate body using schema (partial update allowed)
        const validatedData = maincategory_validations_1.maincategorySchema.partial().parse(req.body);
        const result = await settingsServices.updateMaincategory(Number(id), validatedData);
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
exports.updateMaincategory = updateMaincategory;
const deleteMaincategory = async (req, res) => {
    try {
        const id = req.idNumber;
        console.log("Id==>", id);
        const result = await settingsServices.deleteMaincategory(Number(id));
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        }
        return (0, apiResponse_1.successResponse)(res, { message: result.message });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected error",
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.deleteMaincategory = deleteMaincategory;
