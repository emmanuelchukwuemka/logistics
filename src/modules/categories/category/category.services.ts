import { MainCategory } from "../maincategory/maincategory.models";
import Category from "./category.models";

export const getCategory = async () => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "maincategory_id", "name", "label", "image", "status"],
      order: [["id", "ASC"]],
    });

    return {
      success: true,
      message: "category fetched successfully",
      data: categories,
    };
  } catch (error) {
    console.error("Category fetch error:", error);
    return {
      success: false,
      message: "Category fetch failed",
    };
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await Category.findByPk(id, {
      include: [{ model: MainCategory, as: "maincategory" }]
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      data: category,
    };
  } catch (error) {
    console.error("Get Category By ID Error:", error);
    return { success: false, message: "Failed to fetch category" };
  }
};

export const getCategoriesByMain = async (maincategoryId: number) => {
  try {
    const maincategory = await MainCategory.findByPk(maincategoryId, {
      include: [{ model: Category, as: "categories" }],
    });

    if (!maincategory) {
      return { success: false, message: "Maincategory not found" };
    }

    return { success: true, message: "OK", data: maincategory };
  } catch (error) {
    console.error("Get Categories By Main Error:", error);
    return { success: false, message: "Failed to fetch categories" };
  }
};
