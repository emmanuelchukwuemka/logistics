"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaincategory = exports.updateMaincategory = exports.createMaincategory = void 0;
const maincategory_models_1 = __importDefault(require("../maincategory.models"));
const createMaincategory = async (data) => {
    try {
        // Extract all names from input
        const names = data.map((item) => item.name);
        // Find existing maincategories by name
        const existing = await maincategory_models_1.default.findAll({
            where: { name: names },
        });
        const existingNames = existing.map((item) => item.name);
        // Filter out the ones that already exist
        const newRecords = data.filter((item) => !existingNames.includes(item.name));
        if (newRecords.length === 0) {
            return {
                success: false,
                message: "All provided maincategories already exist",
            };
        }
        // Insert only the new ones
        const inserted = await maincategory_models_1.default.bulkCreate(newRecords.map((item) => ({
            name: item.name,
            label: item.label,
            image: item.image,
            status: 1,
        })));
        return {
            success: true,
            message: "Maincategories created successfully",
            data: inserted.map((item) => ({ id: item.id, name: item.name })),
            skipped: existingNames, // show which were skipped
        };
    }
    catch (error) {
        console.error("Maincategory bulk creation error:", error);
        return {
            success: false,
            message: "Maincategory creation failed",
        };
    }
};
exports.createMaincategory = createMaincategory;
const updateMaincategory = async (id, data) => {
    try {
        const existing = await maincategory_models_1.default.findByPk(id);
        if (!existing) {
            return { success: false, message: "Maincategory not found" };
        }
        await existing.update(data);
        return {
            success: true,
            message: "Maincategory updated successfully",
            data: existing,
        };
    }
    catch (error) {
        console.error("Maincategory update error:", error);
        return {
            success: false,
            message: "Maincategory update failed",
        };
    }
};
exports.updateMaincategory = updateMaincategory;
const deleteMaincategory = async (id) => {
    try {
        const deletedCount = await maincategory_models_1.default.destroy({
            where: { id },
        });
        if (deletedCount === 0) {
            return {
                success: false,
                message: "Maincategory not found",
            };
        }
        return {
            success: true,
            message: "Maincategory deleted successfully",
        };
    }
    catch (error) {
        console.error("Maincategory deletion error:", error);
        return {
            success: false,
            message: "Maincategory deletion failed",
        };
    }
};
exports.deleteMaincategory = deleteMaincategory;
