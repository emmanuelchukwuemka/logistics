import { Router } from "express";
import * as categoriesControllers from "./categories.controllers";

const router = Router();
router.post("/", categoriesControllers.sample);

export default router;
