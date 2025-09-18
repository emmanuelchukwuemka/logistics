"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.getCitiesByStateId = exports.getCities = exports.getCityById = exports.updateCity = exports.createCity = void 0;
const state_models_1 = __importDefault(require("../state/state.models"));
const city_helpers_1 = require("./city.helpers");
const city_models_1 = __importDefault(require("./city.models"));
// export const createCity = async (
//   data: CityCreationAttributes | CityCreationAttributes[]
// ) => {
//   try {
//     const payload = Array.isArray(data) ? data : [data];
//     for (const city of payload) {
//       const state = await getStateById(city.state_id);
//       if (!state) throw new Error(`State not found with id=${city.state_id}`);
//       const exists = await City.findOne({
//         where: { name: city.name, state_id: city.state_id },
//       });
//       if (exists) throw new Error(`City already exists with name=${city.name}`);
//     }
//     const cities =
//       payload.length > 1
//         ? await City.bulkCreate(payload)
//         : [await City.create(payload[0])];
//     return {
//       success: true,
//       message:
//         payload.length > 1
//           ? `${cities.length} cities created successfully`
//           : "City created successfully",
//       data: payload.length > 1 ? cities : cities[0],
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error.message || "Failed to create city",
//       error,
//     };
//   }
// };
const createCity = async (data) => {
    try {
        const payload = Array.isArray(data) ? data : [data];
        const citiesToInsert = [];
        for (const city of payload) {
            const state = await (0, city_helpers_1.getStateById)(city.state_id);
            if (!state) {
                throw new Error(`State not found with id=${city.state_id}`);
            }
            const exists = await city_models_1.default.findOne({
                where: { name: city.name, state_id: city.state_id },
            });
            if (!exists) {
                citiesToInsert.push(city);
            }
        }
        if (citiesToInsert.length === 0) {
            return {
                success: true,
                message: "No new cities to create (all duplicates skipped)",
                data: [],
            };
        }
        const cities = citiesToInsert.length > 1
            ? await city_models_1.default.bulkCreate(citiesToInsert)
            : [await city_models_1.default.create(citiesToInsert[0])];
        return {
            success: true,
            message: citiesToInsert.length > 1
                ? `${cities.length} cities created successfully`
                : "City created successfully",
            data: citiesToInsert.length > 1 ? cities : cities[0],
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message || "Failed to create city",
            error,
        };
    }
};
exports.createCity = createCity;
const updateCity = async (id, data) => {
    try {
        const city = await city_models_1.default.findByPk(id);
        if (!city)
            return { success: false, message: "City not found" };
        await city.update(data);
        return { success: true, message: "City updated successfully", data: city };
    }
    catch (error) {
        return { success: false, message: "Failed to update city", error };
    }
};
exports.updateCity = updateCity;
const getCityById = async (id) => {
    try {
        const city = await city_models_1.default.findByPk(id);
        if (!city)
            return { success: false, message: "City not found" };
        return { success: true, message: "City fetched successfully", data: city };
    }
    catch (error) {
        return { success: false, message: "Failed to fetch city", error };
    }
};
exports.getCityById = getCityById;
const getCities = async () => {
    try {
        const cities = await city_models_1.default.findAll();
        return {
            success: true,
            message: "Cities fetched successfully",
            data: cities,
        };
    }
    catch (error) {
        return { success: false, message: "Failed to fetch cities", error };
    }
};
exports.getCities = getCities;
const getCitiesByStateId = async (stateId) => {
    try {
        const data = await state_models_1.default.findByPk(stateId, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                {
                    model: city_models_1.default,
                    as: "cities",
                    attributes: { exclude: ["created_at", "updated_at"] },
                },
            ],
        });
        if (!data) {
            return { success: false, message: "State not found" };
        }
        return {
            success: true,
            data: data,
            message: "Cities fetched successfully",
        };
    }
    catch (error) {
        console.error("Fetch cities by state error:", error);
        return { success: false, message: "Failed to fetch cities" };
    }
};
exports.getCitiesByStateId = getCitiesByStateId;
const deleteCity = async (id) => {
    try {
        const city = await city_models_1.default.findByPk(id);
        if (!city)
            return { success: false, message: "City not found" };
        await city.destroy();
        return { success: true, message: "City deleted successfully" };
    }
    catch (error) {
        return { success: false, message: "Failed to delete city", error };
    }
};
exports.deleteCity = deleteCity;
