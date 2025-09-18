import { Router } from "express";
import * as settingsControllers from "./settings.controllers";
import { validateIdParam } from "./settings.middlewares";

const router = Router();
router.post("/", settingsControllers.createMaincategory);

router.put("/:id", validateIdParam("id"), settingsControllers.updateMaincategory);

router.delete("/:id", validateIdParam("id"), settingsControllers.deleteMaincategory);

export default router;
