import { Router } from "express";
import * as cityControllers from "./city.controllers";
import {
  validateCityCreate,
  validateCityUpdate,
  validateIdParam,
} from "./city.middlewares";

const router = Router();
router.post("/", validateCityCreate, cityControllers.createCity);

router.put(
  "/:id",
  validateIdParam,
  validateCityUpdate,
  cityControllers.updateCity
);

router.delete("/:id", validateIdParam, cityControllers.deleteCity);

// Fetching
router.get("/", cityControllers.getCities);

router.get("/:id", validateIdParam, cityControllers.getCityById);

router.get("/state/:id", validateIdParam, cityControllers.fetchCitiesByState);

export default router;
