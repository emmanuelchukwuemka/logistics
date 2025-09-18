"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContinent = exports.updateContinent = exports.getContinentById = exports.getContinents = exports.createContinent = void 0;
const continent_models_1 = __importDefault(require("./continent.models"));
const createContinent = async (data) => {
    try {
        const continents = Array.isArray(data) ? data : [data];
        const inserted = [];
        for (const c of continents) {
            // Skip if exists
            const exists = await continent_models_1.default.findOne({ where: { name: c.name } });
            if (exists)
                continue;
            const newContinent = await continent_models_1.default.create(c);
            inserted.push(newContinent);
        }
        return {
            success: true,
            message: inserted.length
                ? "Continents created successfully"
                : "No new continents to add",
            data: inserted.map((c) => ({ id: c.id, name: c.name })),
        };
    }
    catch (error) {
        console.error("Continent creation error:", error);
        return { success: false, message: "Failed to create continents" };
    }
};
exports.createContinent = createContinent;
const getContinents = async () => {
    try {
        const data = await continent_models_1.default.findAll({ where: { status: 1 } });
        return { success: true, data };
    }
    catch (error) {
        console.error("Fetch continents error:", error);
        return { success: false, message: "Failed to fetch continents" };
    }
};
exports.getContinents = getContinents;
const getContinentById = async (id) => {
    try {
        const continent = await continent_models_1.default.findByPk(id);
        if (!continent) {
            return { success: false, message: "Continent not found" };
        }
        return { success: true, data: continent };
    }
    catch (error) {
        console.error("Get continent by ID error:", error);
        return { success: false, message: "Failed to fetch continent" };
    }
};
exports.getContinentById = getContinentById;
const updateContinent = async (id, data) => {
    try {
        const continent = await continent_models_1.default.findByPk(id);
        if (!continent)
            return { success: false, message: "Continent not found" };
        const updateData = Array.isArray(data) ? data[0] : data;
        await continent.update(updateData);
        console.log("Updated continent:", continent.toJSON());
        return {
            success: true,
            message: "Continent updated successfully",
            data: continent,
        };
    }
    catch (error) {
        console.error("Update continent error:", error);
        return {
            success: false,
            message: "Failed to update continent",
        };
    }
};
exports.updateContinent = updateContinent;
const deleteContinent = async (id) => {
    try {
        const continent = await continent_models_1.default.findByPk(id);
        if (!continent)
            return { success: false, message: "Continent not found" };
        await continent.destroy();
        return { success: true, message: "Continent deleted successfully" };
    }
    catch (error) {
        console.error("Delete continent error:", error);
        return { success: false, message: "Failed to delete continent" };
    }
};
exports.deleteContinent = deleteContinent;
