import Category from "../category/category.models";
import { Subcategory } from "./subcategory.models";
import { SubcategoryInput } from "./subcategory.validations";

export const getAllSubcategories = async () => {
  try {
    const categories = await Subcategory.findAll({
      attributes: ["id", "name", "label", "image", "status"],
      order: [["id", "ASC"]],
    });

    return {
      success: true,
      message: "subcategory fetched successfully",
      data: categories,
    };
  } catch (error) {
    console.error("Subcategory fetch error:", error);
    return {
      success: false,
      message: "Subcategory fetch failed",
    };
  }
};

export const getSubcategoryById = async (id: number) => {
  try {
    const subcategory = await Subcategory.findByPk(id, {
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
  } catch (error) {
    console.error("Subcategory fetch error:", error);
    return {
      success: false,
      message: "Unable to fetch subcategory",
    };
  }
};

export const getSubcategoriesByCategoryId = async (categoryId: number) => {
  try {

    const data = await Category.findByPk(categoryId, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Subcategory,
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
     
  } catch (error) {
    console.error("Subcategory fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch subcategories",
    };
  }
};