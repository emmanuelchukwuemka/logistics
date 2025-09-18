import MainCategory from "./maincategory.models";

export const getMaincategory = async () => {
  try {
    const categories = await MainCategory.findAll({
      attributes: ["id", "name", "label", "image", "status"],
      order: [["id", "ASC"]], // optional sorting
    });

    return {
      success: true,
      message: "Maincategories fetched successfully",
      data: categories,
    };
  } catch (error) {
    console.error("Maincategory fetch error:", error);
    return {
      success: false,
      message: "Maincategory fetch failed",
    };
  }
};
