import { Router } from "express";
import maincategoryRoutes from "./maincategory.routes";
import { maincategorySecure } from "./maincategory.middlewares";

import settingsModule from "./settings";
const router = Router();
router.use("/", maincategorySecure, maincategoryRoutes);

router.use("/settings", settingsModule);

export default router;
