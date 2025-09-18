import { Router } from "express";
import regionRoutes from "./region.routes";
import { regionSecure } from "./region.middlewares";

const router = Router();
router.use("/", regionSecure, regionRoutes);

export default router;
