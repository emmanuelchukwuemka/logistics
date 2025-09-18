import { Router } from "express";
import bannerRoutes from "./banner.routes";
import { bannerSecure } from "./banner.middlewares";

const router = Router();
router.use("/", bannerSecure, bannerRoutes);

export default router;
