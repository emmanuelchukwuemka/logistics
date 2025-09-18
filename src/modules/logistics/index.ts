import { Router } from "express";
import logisticsRoutes from "./logistics.routes";

console.log("Logistics module loaded");

const router = Router();
router.use("/", logisticsRoutes);

export default router;
