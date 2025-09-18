"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegion = exports.updateRegion = exports.createRegion = exports.getRegionsByContinentId = exports.getRegionById = exports.getRegions = void 0;
const continent_models_1 = __importDefault(require("../continent/continent.models"));
const region_models_1 = __importDefault(require("./region.models"));
// Fetch all regions
const getRegions = async () => {
    try {
        const data = await region_models_1.default.findAll({ where: { status: 1 } });
        return { success: true, data };
    }
    catch (error) {
        console.error("Fetch regions error:", error);
        return { success: false, message: "Failed to fetch regions" };
    }
};
exports.getRegions = getRegions;
// Fetch region by ID
const getRegionById = async (id) => {
    try {
        const region = await region_models_1.default.findByPk(id);
        if (!region)
            return { success: false, message: "Region not found" };
        return { success: true, data: region };
    }
    catch (error) {
        console.error("Get region by ID error:", error);
        return { success: false, message: "Failed to fetch region" };
    }
};
exports.getRegionById = getRegionById;
// Fetch region by continent
const getRegionsByContinentId = async (continent_id) => {
    try {
        const data = await continent_models_1.default.findByPk(continent_id, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                {
                    model: region_models_1.default,
                    as: "regions",
                    attributes: { exclude: ["created_at", "updated_at"] },
                },
            ],
        });
        if (!data) {
            return { success: false, message: "Region not found" };
        }
        return { success: true, data: data };
    }
    catch (error) {
        console.error("Get regions by continent error:", error);
        return { success: false, message: "Failed to fetch regions" };
    }
};
exports.getRegionsByContinentId = getRegionsByContinentId;
// Create region(s)
const createRegion = async (data) => {
    try {
        const inputArray = Array.isArray(data) ? data : [data];
        const inserted = await region_models_1.default.bulkCreate(inputArray);
        return {
            success: true,
            message: "Regions created successfully",
            data: inserted,
        };
    }
    catch (error) {
        console.error("Create region error:", error);
        return { success: false, message: "Failed to create region" };
    }
};
exports.createRegion = createRegion;
// Update region
const updateRegion = async (id, data) => {
    try {
        const region = await region_models_1.default.findByPk(id);
        if (!region)
            return { success: false, message: "Region not found" };
        await region.update(data);
        return {
            success: true,
            message: "Region updated successfully",
            data: region,
        };
    }
    catch (error) {
        console.error("Update region error:", error);
        return { success: false, message: "Failed to update region" };
    }
};
exports.updateRegion = updateRegion;
// Delete region
const deleteRegion = async (id) => {
    try {
        const region = await region_models_1.default.findByPk(id);
        if (!region) {
            return { success: false, message: "Region not found" };
        }
        await region.destroy();
        return { success: true, message: "Region deleted successfully" };
    }
    catch (error) {
        console.error("Delete region error:", error);
        return { success: false, message: "Failed to delete region" };
    }
};
exports.deleteRegion = deleteRegion;
