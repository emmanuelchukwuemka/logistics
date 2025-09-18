import { Router } from "express";
import * as regionControllers from "./region.controllers";
import { validateIdParam, validateRegionCreate, validateRegionUpdate } from "./region.middlewares";

const router = Router();
router.post("/", validateRegionCreate, regionControllers.createRegion);

router.get("/", regionControllers.getRegions);

router.get("/:id", validateIdParam, regionControllers.getRegionById);

router.get(
  "/continent/:id",
  validateIdParam,
  regionControllers.getRegionsByContinentId
);

router.put(
  "/:id",
  validateIdParam,
  validateRegionUpdate,
  regionControllers.updateRegion
);

router.delete(
  "/:id",
  validateIdParam,
  regionControllers.deleteRegion
);

export default router;
