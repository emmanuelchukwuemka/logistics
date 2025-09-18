import { Router } from "express";
import currencyRoutes from "./currency.routes";
import { currencySecure } from "./currency.middlewares";

const router = Router();
router.use("/", currencySecure, currencyRoutes);

export default router;
