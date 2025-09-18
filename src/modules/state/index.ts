import { Router } from "express";
import stateRoutes from "./state.routes";
import { stateSecure } from "./state.middlewares";

const router = Router();
router.use("/", stateSecure, stateRoutes);

export default router;
