import { Router } from "express";
import userRoutes from "./user.routes";
import { userSecure } from "./user.middlewares";

const router = Router();
router.use("/", userSecure, userRoutes);

export default router;
