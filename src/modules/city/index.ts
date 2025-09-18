import { Router } from "express";
import cityRoutes from "./city.routes";
import { citySecure } from "./city.middlewares";

const router = Router();
router.use("/", citySecure, cityRoutes);

export default router;
