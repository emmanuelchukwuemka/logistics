import { Router } from "express";
import * as subcategoryControllers from "./subcategory.controllers";
import { validateIdParam } from "./subcategory.middlewares";

const router = Router();
router.get("/", subcategoryControllers.fetchAllSubcategories);

router.get(
  "/:id",
  validateIdParam,
  subcategoryControllers.fetchSubcategoryById
);

router.get(
  "/category/:id",
  validateIdParam,
  subcategoryControllers.fetchSubcategoriesByCategoryId
);

export default router;
