import { Router } from "express";
import categoryRoutes from "./category.routes";
import { categorySecure } from "./category.middlewares";
import settingsModule from "./settings";

const router = Router();
router.use("/", categorySecure, categoryRoutes);

router.use("/settings", settingsModule);

export default router;
