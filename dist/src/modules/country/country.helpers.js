"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCountryByIso = void 0;
// country.helpers.ts
const country_models_1 = __importDefault(require("./country.models"));
const findCountryByIso = async (iso2, iso3) => {
    return await country_models_1.default.findOne({
        where: { iso2, iso3 },
    });
};
exports.findCountryByIso = findCountryByIso;
