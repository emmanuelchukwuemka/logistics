import MainCategory from "../maincategory.models";
import { MaincategoryInput } from "../maincategory.validations";

export const createMaincategory = async (data: MaincategoryInput[]) => {
  try {
    // Extract all names from input
    const names = data.map((item) => item.name);

    // Find existing maincategories by name
    const existing = await MainCategory.findAll({
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
        message: "All provided maincategories already exist",
      };
    }

    // Insert only the new ones
    const inserted = await MainCategory.bulkCreate(
      newRecords.map((item) => ({
        name: item.name,
        label: item.label,
        image: item.image,
        status: 1,
      }))
    );

    return {
      success: true,
      message: "Maincategories created successfully",
      data: inserted.map((item) => ({ id: item.id, name: item.name })),
      skipped: existingNames, // show which were skipped
    };
  } catch (error) {
    console.error("Maincategory bulk creation error:", error);
    return {
      success: false,
      message: "Maincategory creation failed",
    };
  }
};

export const updateMaincategory = async (
  id: number,
  data: Partial<MaincategoryInput>
) => {
  try {
    const existing = await MainCategory.findByPk(id);
    if (!existing) {
      return { success: false, message: "Maincategory not found" };
    }

    await existing.update(data);

    return {
      success: true,
      message: "Maincategory updated successfully",
      data: existing,
    };
  } catch (error) {
    console.error("Maincategory update error:", error);
    return {
      success: false,
      message: "Maincategory update failed",
    };
  }
};

export const deleteMaincategory = async (id: number) => {
  try {
    const deletedCount = await MainCategory.destroy({
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
  } catch (error) {
    console.error("Maincategory deletion error:", error);
    return {
      success: false,
      message: "Maincategory deletion failed",
    };
  }
};
