import { Router } from "express";
import continentRoutes from "./continent.routes";
import { continentSecure } from "./continent.middlewares";

const router = Router();
router.use("/", continentSecure, continentRoutes);

export default router;
