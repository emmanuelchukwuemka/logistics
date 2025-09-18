import { Router } from "express";
import * as countryControllers from "./country.controllers";
import { validateCountryUpdate, validateCreatePayload, validateIdParam } from "./country.middlewares";

const router = Router();
router.post("/", validateCreatePayload, countryControllers.createCountry);

router.get("/", countryControllers.fetchCountries);

router.get("/:id", validateIdParam, countryControllers.fetchCountryById);

router.get("/region/:id", validateIdParam,countryControllers.fetchCountriesByRegion);

router.put("/:id", validateIdParam,validateCountryUpdate,countryControllers.updateCountry);

router.delete( "/:id", validateIdParam,countryControllers.deleteCountry
);

export default router;
