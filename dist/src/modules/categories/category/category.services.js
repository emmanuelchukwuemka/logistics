"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesByMain = exports.getCategoryById = exports.getCategory = void 0;
const maincategory_models_1 = require("../maincategory/maincategory.models");
const category_models_1 = __importDefault(require("./category.models"));
const getCategory = async () => {
    try {
        const categories = await category_models_1.default.findAll({
            attributes: ["id", "maincategory_id", "name", "label", "image", "status"],
            order: [["id", "ASC"]],
        });
        return {
            success: true,
            message: "category fetched successfully",
            data: categories,
        };
    }
    catch (error) {
        console.error("Category fetch error:", error);
        return {
            success: false,
            message: "Category fetch failed",
        };
    }
};
exports.getCategory = getCategory;
const getCategoryById = async (id) => {
    try {
        const category = await category_models_1.default.findByPk(id, {
            include: [{ model: maincategory_models_1.MainCategory, as: "maincategory" }]
        });
        if (!category) {
            return { success: false, message: "Category not found" };
        }
        return {
            success: true,
            message: "Category fetched successfully",
            data: category,
        };
    }
    catch (error) {
        console.error("Get Category By ID Error:", error);
        return { success: false, message: "Failed to fetch category" };
    }
};
exports.getCategoryById = getCategoryById;
const getCategoriesByMain = async (maincategoryId) => {
    try {
        const maincategory = await maincategory_models_1.MainCategory.findByPk(maincategoryId, {
            include: [{ model: category_models_1.default, as: "categories" }],
        });
        if (!maincategory) {
            return { success: false, message: "Maincategory not found" };
        }
        return { success: true, message: "OK", data: maincategory };
    }
    catch (error) {
        console.error("Get Categories By Main Error:", error);
        return { success: false, message: "Failed to fetch categories" };
    }
};
exports.getCategoriesByMain = getCategoriesByMain;
