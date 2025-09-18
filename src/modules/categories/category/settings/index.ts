import { Router } from "express";
import settingsRoutes from "./settings.routes";
import { settingsSecure } from "./settings.middlewares";

const router = Router();
router.use("/", settingsSecure, settingsRoutes);

export default router;
