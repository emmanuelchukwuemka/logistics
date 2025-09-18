import { Router } from "express";
import countryRoutes from "./country.routes";
import { countrySecure } from "./country.middlewares";

const router = Router();
router.use("/", countrySecure, countryRoutes);

export default router;
