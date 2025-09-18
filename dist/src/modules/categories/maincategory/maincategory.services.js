"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaincategory = void 0;
const maincategory_models_1 = __importDefault(require("./maincategory.models"));
const getMaincategory = async () => {
    try {
        const categories = await maincategory_models_1.default.findAll({
            attributes: ["id", "name", "label", "image", "status"],
            order: [["id", "ASC"]], // optional sorting
        });
        return {
            success: true,
            message: "Maincategories fetched successfully",
            data: categories,
        };
    }
    catch (error) {
        console.error("Maincategory fetch error:", error);
        return {
            success: false,
            message: "Maincategory fetch failed",
        };
    }
};
exports.getMaincategory = getMaincategory;
