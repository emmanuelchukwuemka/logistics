"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.getCountriesByRegion = exports.getCountryById = exports.getCountries = exports.createCountry = void 0;
const country_models_1 = __importDefault(require("./country.models"));
const country_helpers_1 = require("./country.helpers");
const region_models_1 = __importDefault(require("../region/region.models"));
const createCountry = async (data) => {
    try {
        const payload = Array.isArray(data) ? data : [data];
        const createdCountries = [];
        const skippedCountries = [];
        for (const country of payload) {
            const exists = await (0, country_helpers_1.findCountryByIso)(country.iso2, country.iso3);
            if (exists) {
                console.warn(`Skipping duplicate: ${country.iso2}/${country.iso3}`);
                skippedCountries.push(country);
                continue; // skip duplicates
            }
            const newCountry = await country_models_1.default.create(country);
            createdCountries.push(newCountry);
        }
        if (createdCountries.length === 0) {
            return {
                success: false,
                message: "No new countries created (all duplicates skipped)",
                data: [],
            };
        }
        return {
            success: true,
            message: createdCountries.length > 1
                ? `${createdCountries.length} countries created successfully`
                : "Country created successfully",
            data: createdCountries.length > 1 ? createdCountries : createdCountries[0],
            skipped: skippedCountries.length > 0 ? skippedCountries : undefined,
        };
    }
    catch (error) {
        console.error("Create country error:", error);
        return {
            success: false,
            message: "Failed to create country",
            error,
        };
    }
};
exports.createCountry = createCountry;
const getCountries = async () => {
    try {
        const countries = await country_models_1.default.findAll({
            attributes: { exclude: ["created_at", "updated_at"] },
        });
        return {
            success: true,
            message: "Countries fetched successfully",
            data: countries,
        };
    }
    catch (error) {
        console.error("Fetch countries error:", error);
        return {
            success: false,
            message: "Failed to fetch countries",
            error,
        };
    }
};
exports.getCountries = getCountries;
const getCountryById = async (id) => {
    try {
        const country = await country_models_1.default.findByPk(id, {
            attributes: { exclude: ["created_at", "updated_at"] },
        });
        if (!country) {
            return {
                success: false,
                message: "Country not found",
            };
        }
        return {
            success: true,
            message: "Country fetched successfully",
            data: country,
        };
    }
    catch (error) {
        console.error("Fetch country by id error:", error);
        return {
            success: false,
            message: "Failed to fetch country",
            error,
        };
    }
};
exports.getCountryById = getCountryById;
const getCountriesByRegion = async (regionId) => {
    try {
        const data = await region_models_1.default.findByPk(regionId, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                {
                    model: country_models_1.default,
                    as: "countries",
                    attributes: { exclude: ["created_at", "updated_at"] },
                },
            ],
        });
        if (!data) {
            return { success: false, message: "Region not found" };
        }
        return {
            success: true,
            message: "Countries fetched successfully",
            data: data,
        };
    }
    catch (error) {
        console.error("Fetch countries by region error:", error);
        return {
            success: false,
            message: "Failed to fetch countries by region",
            error,
        };
    }
};
exports.getCountriesByRegion = getCountriesByRegion;
const updateCountry = async (id, data) => {
    try {
        const country = await country_models_1.default.findByPk(id);
        if (!country) {
            return { success: false, message: "Country not found" };
        }
        // If iso2 or iso3 is being updated, check duplicates
        if (data.iso2 || data.iso3) {
            const iso2 = data.iso2 ?? country.iso2;
            const iso3 = data.iso3 ?? country.iso3;
            const exists = await (0, country_helpers_1.findCountryByIso)(iso2, iso3);
            if (exists && exists.id !== id) {
                return {
                    success: false,
                    message: `Another country already exists with iso2=${iso2}, iso3=${iso3}`,
                };
            }
        }
        await country.update(data);
        return {
            success: true,
            message: "Country updated successfully",
            data: country,
        };
    }
    catch (error) {
        console.error("Update country error:", error);
        return {
            success: false,
            message: "Failed to update country",
            error,
        };
    }
};
exports.updateCountry = updateCountry;
const deleteCountry = async (id) => {
    try {
        const country = await country_models_1.default.findByPk(id);
        if (!country)
            return { success: false, message: "Country not found" };
        await country.destroy();
        return { success: true, message: "Country deleted" };
    }
    catch (error) {
        console.error("Delete country error:", error);
        return { success: false, message: "Failed to delete country" };
    }
};
exports.deleteCountry = deleteCountry;
