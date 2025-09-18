"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleOrArray = exports.getCountryById = void 0;
const zod_1 = __importDefault(require("zod"));
const country_models_1 = __importDefault(require("../country/country.models"));
const getCountryById = async (id) => {
    return await country_models_1.default.findByPk(id);
};
exports.getCountryById = getCountryById;
// Helper that allows either a single object or an array of objects
const singleOrArray = (schema) => zod_1.default.union([schema, zod_1.default.array(schema)]);
exports.singleOrArray = singleOrArray;
