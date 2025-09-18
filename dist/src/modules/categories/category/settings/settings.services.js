"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const category_models_1 = require("../category.models");
const createCategory = async (data) => {
    try {
        // Extract all names from input
        const names = data.map((item) => item.name);
        // Find existing maincategories by name
        const existing = await category_models_1.Category.findAll({
            where: { name: names },
        });
        const existingNames = existing.map((item) => item.name);
        // Filter out the ones that already exist
        const newRecords = data.filter((item) => !existingNames.includes(item.name));
        if (newRecords.length === 0) {
            return {
                success: false,
                message: "All provided Categories already exist",
            };
        }
        // Inserting only the new ones
        const inserted = await category_models_1.Category.bulkCreate(newRecords.map((item) => ({
            maincategory_id: item.maincategory_id,
            name: item.name,
            label: item.label,
            image: item.image ?? null,
        })));
        return {
            success: true,
            message: "Category created successfully",
            data: inserted.map((item) => ({ id: item.id, name: item.name })),
            skipped: existingNames, // show which were skipped
        };
    }
    catch (error) {
        console.error("Category bulk creation error:", error);
        return {
            success: false,
            message: "Category creation failed",
        };
    }
};
exports.createCategory = createCategory;
const updateCategory = async (id, data) => {
    try {
        const existing = await category_models_1.Category.findByPk(id);
        if (!existing) {
            return {
                success: false,
                message: "Category not found",
            };
        }
        await existing.update(data);
        return {
            success: true,
            message: "Category updated successfully",
            data: existing,
        };
    }
    catch (error) {
        console.error("Category update error:", error);
        return {
            success: false,
            message: "Category update failed",
        };
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    try {
        const existing = await category_models_1.Category.findByPk(id);
        if (!existing) {
            return { success: false, message: "Category not found" };
        }
        await existing.destroy();
        return {
            success: true,
            message: "Category deleted successfully",
        };
    }
    catch (error) {
        console.error("Category delete error:", error);
        return {
            success: false,
            message: "Category delete failed",
        };
    }
};
exports.deleteCategory = deleteCategory;
