"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategoriesByCategoryId = exports.getSubcategoryById = exports.getAllSubcategories = void 0;
const category_models_1 = __importDefault(require("../category/category.models"));
const subcategory_models_1 = require("./subcategory.models");
const getAllSubcategories = async () => {
    try {
        const categories = await subcategory_models_1.Subcategory.findAll({
            attributes: ["id", "name", "label", "image", "status"],
            order: [["id", "ASC"]],
        });
        return {
            success: true,
            message: "subcategory fetched successfully",
            data: categories,
        };
    }
    catch (error) {
        console.error("Subcategory fetch error:", error);
        return {
            success: false,
            message: "Subcategory fetch failed",
        };
    }
};
exports.getAllSubcategories = getAllSubcategories;
const getSubcategoryById = async (id) => {
    try {
        const subcategory = await subcategory_models_1.Subcategory.findByPk(id, {
            attributes: ["id", "name", "label", "image", "status"],
        });
        if (!subcategory) {
            return {
                success: false,
                message: "Subcategory not found",
            };
        }
        return {
            success: true,
            message: "Subcategory fetched successfully",
            data: subcategory,
        };
    }
    catch (error) {
        console.error("Subcategory fetch error:", error);
        return {
            success: false,
            message: "Unable to fetch subcategory",
        };
    }
};
exports.getSubcategoryById = getSubcategoryById;
const getSubcategoriesByCategoryId = async (categoryId) => {
    try {
        const data = await category_models_1.default.findByPk(categoryId, {
            attributes: { exclude: ["created_at", "updated_at"] },
            include: [
                {
                    model: subcategory_models_1.Subcategory,
                    as: "subcategories",
                    attributes: { exclude: ["created_at", "updated_at"] },
                },
            ],
        });
        if (!data) {
            return { success: false, message: "Category not found" };
        }
        return {
            success: true,
            message: "Subcategories fetched successfully",
            data: data,
        };
    }
    catch (error) {
        console.error("Subcategory fetch error:", error);
        return {
            success: false,
            message: "Failed to fetch subcategories",
        };
    }
};
exports.getSubcategoriesByCategoryId = getSubcategoriesByCategoryId;
