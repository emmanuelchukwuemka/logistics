import { Router } from "express";
import * as settingsControllers from "./settings.controllers";
import { validateCategoryCreate,validateCategoryUpdate, validateIdParam} from "./settings.middlewares";

const router = Router();
router.post("/", validateCategoryCreate, settingsControllers.addCategory);

router.put("/:id", validateCategoryUpdate, settingsControllers.updateCategory);

router.delete("/:id", validateIdParam, settingsControllers.deleteCategory);


export default router;
