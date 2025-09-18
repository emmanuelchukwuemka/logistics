import { Router } from "express";
import * as settingsControllers from "./settings.controllers";
import { validateIdParam, validateSubcategoryCreate, validateSubcategoryUpdate } from "./settings.middlewares";
import { validateIdAndUpdate } from "./settings.helpers";

const router = Router();
router.post("/", validateSubcategoryCreate, settingsControllers.createSubcategory);

router.put("/:id", validateIdParam, validateSubcategoryUpdate, settingsControllers.updateSubcategory);

router.delete(
  "/:id",
  validateIdParam,
  settingsControllers.deleteSubcategory,
  settingsControllers.updateSubcategory
);

export default router;
