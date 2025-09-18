import { Router } from "express";
import { AppBannerController } from "./banner.controllers";

const router = Router();

router.post("/", AppBannerController.create);
router.get("/", AppBannerController.getAll);
router.get("/:id", AppBannerController.getById);
router.put("/:id", AppBannerController.update);
router.delete("/:id", AppBannerController.delete);

export default router;
