import { validateIdParam, validateSubcategoryUpdate } from "./settings.middlewares";

export const validateIdAndUpdate = [validateIdParam, validateSubcategoryUpdate];
