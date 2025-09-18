"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatesByCountry = exports.getStateById = exports.getStates = exports.deleteState = exports.updateState = exports.createState = void 0;
const country_models_1 = __importDefault(require("../country/country.models"));
const state_helpers_1 = require("./state.helpers");
const state_models_1 = __importDefault(require("./state.models"));
const createState = async (data) => {
    try {
        const payload = Array.isArray(data) ? data : [data];
        for (const state of payload) {
            // Check if country exists
            const country = await (0, state_helpers_1.getCountryById)(state.country_id);
            if (!country) {
                return {
                    success: false,
                    message: `Country with id=${state.country_id} does not exist.`,
                };
            }
            // Check if state already exists (by name or code in same country)
            const existingState = await state_models_1.default.findOne({
                where: {
                    country_id: state.country_id,
                    name: state.name,
                },
            });
            if (existingState) {
                return {
                    success: false,
                    message: `State "${state.name}" already exists in country ${country.name}.`,
                };
            }
        }
        //Insert states
        const states = payload.length > 1
            ? await state_models_1.default.bulkCreate(payload)
            : [await state_models_1.default.create(payload[0])];
        return {
            success: true,
            message: payload.length > 1
                ? `${states.length} states created successfully`
                : "State created successfully",
            data: payload.length > 1 ? states : states[0],
        };
    }
    catch (error) {
        console.error("Create state error:", error);
        return { success: false, message: "Failed to create state", error };
    }
};
exports.createState = createState;
const updateState = async (id, data) => {
    try {
        const state = await state_models_1.default.findByPk(id);
        if (!state) {
            return { success: false, message: "State not found" };
        }
        // Flatten array if data comes as [ { ... } ]
        const updateData = Array.isArray(data) ? data[0] : data;
        if (!updateData || Object.keys(updateData).length === 0) {
            return { success: false, message: "No fields provided to update" };
        }
        await state.update(updateData);
        return {
            success: true,
            message: "State updated successfully",
            data: state,
        };
    }
    catch (error) {
        console.error("Update state error:", error);
        return {
            success: false,
            message: "Failed to update state",
            error,
        };
    }
};
exports.updateState = updateState;
const deleteState = async (id) => {
    try {
        const state = await state_models_1.default.findByPk(id);
        if (!state) {
            return { success: false, message: "State not found" };
        }
        await state.destroy();
        return { success: true, message: "State deleted successfully" };
    }
    catch (error) {
        console.error("Delete state error:", error);
        return { success: false, message: "Failed to delete state", error };
    }
};
exports.deleteState = deleteState;
const getStates = async () => {
    try {
        const states = await state_models_1.default.findAll({
            attributes: { exclude: ["created_at", "updated_at"] },
        });
        return {
            success: true,
            message: "States fetched successfully",
            data: states,
        };
    }
    catch (error) {
        console.error("Fetch states error:", error);
        return { success: false, message: "Failed to fetch states", error };
    }
};
exports.getStates = getStates;
const getStateById = async (id) => {
    try {
        const state = await state_models_1.default.findByPk(id, {
            attributes: { exclude: ["created_at", "updated_at"] },
        });
        if (!state)
            return { success: false, message: "State not found" };
        return {
            success: true,
            message: "State fetched successfully",
            data: state,
        };
    }
    catch (error) {
        console.error("Fetch state by id error:", error);
        return { success: false, message: "Failed to fetch state", error };
    }
};
exports.getStateById = getStateById;
const getStatesByCountry = async (country_id) => {
    try {
        const data = await country_models_1.default.findByPk(country_id, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                {
                    model: state_models_1.default,
                    as: "states",
                    attributes: { exclude: ["created_at", "updated_at"] },
                },
            ],
        });
        if (!data) {
            return { success: false, message: "Counrty not found" };
        }
        return {
            success: true,
            message: "States fetched successfully",
            data: data,
        };
    }
    catch (error) {
        console.error("Fetch states by country error:", error);
        return { success: false, message: "Failed to fetch states", error };
    }
};
exports.getStatesByCountry = getStatesByCountry;
