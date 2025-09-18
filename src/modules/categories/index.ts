import { Router } from "express";
import categoriesRoutes from "./categories.routes";
import { categoriesSecure } from "./categories.middlewares";
import maincategoryModule from "./maincategory";
import categoryModule from "./category";

import subcategoryModule from "./subcategory";
const router = Router();
router.use("/", categoriesSecure, categoriesRoutes);

router.use("/maincategory", maincategoryModule);

router.use("/category", categoryModule);

router.use("/subcategory", subcategoryModule);

export default router;
