import { Category } from "../category.models";
import { CategoryInput } from "../category.validations";
import { SettingsInput } from "./settings.validations";

export const createCategory = async (data: CategoryInput[]) => {
  try {
    // Extract all names from input
    const names = data.map((item) => item.name);

    // Find existing maincategories by name
    const existing = await Category.findAll({
      where: { name: names },
    });

    const existingNames = existing.map((item) => item.name);

    // Filter out the ones that already exist
    const newRecords = data.filter(
      (item) => !existingNames.includes(item.name)
    );

    if (newRecords.length === 0) {
      return {
        success: false,
        message: "All provided Categories already exist",
      };
    }

    // Inserting only the new ones
    const inserted = await Category.bulkCreate(
      newRecords.map((item) => ({
        maincategory_id:item.maincategory_id,
        name: item.name,
        label: item.label,
        image: item.image ?? null,
      }))
    );

    return {
      success: true,
      message: "Category created successfully",
      data: inserted.map((item) => ({ id: item.id, name: item.name })),
      skipped: existingNames, // show which were skipped
    };
  } catch (error) {
    console.error("Category bulk creation error:", error);
    return {
      success: false,
      message: "Category creation failed",
    };
  }
};

export const updateCategory = async (
  id: number,
  data: Partial<CategoryInput>
) => {
  try {

    const existing = await Category.findByPk(id);

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
  } catch (error) {
    console.error("Category update error:", error);
    return {
      success: false,
      message: "Category update failed",
    };
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const existing = await Category.findByPk(id);

    if (!existing) {
      return { success: false, message: "Category not found" };
    }

    await existing.destroy();

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("Category delete error:", error);
    return {
      success: false,
      message: "Category delete failed",
    };
  }
};
