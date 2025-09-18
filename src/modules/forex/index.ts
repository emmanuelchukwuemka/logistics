import { Router } from "express";
import forexRoutes from "./forex.routes";
import { forexSecure } from "./forex.middlewares";

const router = Router();
router.use("/", forexSecure, forexRoutes);

export default router;
