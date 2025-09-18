import { Router } from "express";
import * as categoryControllers from "./category.controllers";

const router = Router();
router.get("/", categoryControllers.getCategory);

router.get("/:id", categoryControllers.fetchCategoryById);

router.get("/by-main/:id", categoryControllers.getCategoriesByMain);

export default router;
