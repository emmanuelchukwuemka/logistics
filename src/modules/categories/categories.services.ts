import { CategoriesInput } from "./categories.validations";

export const categoriesMethod = async (data: CategoriesInput) => {
  try {
    // Abeg ur business logic should go here

    return {
      success: true,
      message: "Categories action completed successfully",
      data: { id: 1 },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Categories action failed",
    };
  }
};
