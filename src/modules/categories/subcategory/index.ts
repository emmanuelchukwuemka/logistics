import { Router } from "express";
import subcategoryRoutes from "./subcategory.routes";
import { subcategorySecure } from "./subcategory.middlewares";

import settingsModule from "./settings";
const router = Router();
router.use("/", subcategorySecure, subcategoryRoutes);

router.use("/settings", settingsModule);

export default router;
