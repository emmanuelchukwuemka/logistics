"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategory = exports.updateSubcategory = exports.createSubcategory = void 0;
const subcategory_models_1 = require("../subcategory.models");
const createSubcategory = async (data) => {
    try {
        // Extract all names from input
        const names = data.map((item) => item.name);
        // Find existing subcategories by name under the same category
        const existing = await subcategory_models_1.Subcategory.findAll({
            where: { name: names },
        });
        const existingNames = existing.map((item) => item.name);
        // Filter out duplicates
        const newRecords = data.filter((item) => !existingNames.includes(item.name));
        if (newRecords.length === 0) {
            return {
                success: false,
                message: "All provided Subcategories already exist",
            };
        }
        // Bulk insert
        const inserted = await subcategory_models_1.Subcategory.bulkCreate(newRecords.map((item) => ({
            category_id: item.category_id,
            name: item.name,
            label: item.label,
            image: item.image ?? null,
            status: item.status ?? 1,
        })));
        return {
            success: true,
            message: "Subcategory created successfully",
            data: inserted.map((item) => ({ id: item.id, name: item.name })),
            skipped: existingNames,
        };
    }
    catch (error) {
        console.error("Subcategory bulk creation error:", error);
        return {
            success: false,
            message: "Subcategory creation failed",
        };
    }
};
exports.createSubcategory = createSubcategory;
const updateSubcategory = async (id, data) => {
    try {
        const existing = await subcategory_models_1.Subcategory.findByPk(id);
        if (!existing) {
            return {
                success: false,
                message: "Subcategory not found",
            };
        }
        await existing.update(data);
        return {
            success: true,
            message: "Subcategory updated successfully",
            data: existing,
        };
    }
    catch (error) {
        console.error("Error updating subcategory:", error);
        return {
            success: false,
            message: "Failed to update subcategory",
        };
    }
};
exports.updateSubcategory = updateSubcategory;
const deleteSubcategory = async (id) => {
    const subcategory = await subcategory_models_1.Subcategory.findByPk(id);
    if (!subcategory) {
        return null;
    }
    await subcategory.destroy();
    return subcategory;
};
exports.deleteSubcategory = deleteSubcategory;
