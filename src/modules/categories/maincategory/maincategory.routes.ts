import { Router } from "express";
import * as maincategoryControllers from "./maincategory.controllers";

const router = Router();
router.get("/", maincategoryControllers.getMaincategory);

export default router;
