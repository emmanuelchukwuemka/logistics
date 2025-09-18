import { Router } from "express";
import * as currencyControllers from "./currency.controllers";
import {
  validateCurrencyPayload,
  validateIdParam,
  validateUpdateCurrency,
} from "./currency.middlewares";

const router = Router();
router.post("/", validateCurrencyPayload, currencyControllers.createCurrency);

router.put(
  "/:id",
  validateIdParam,
  validateUpdateCurrency,
  currencyControllers.updateCurrency
);

router.delete("/:id", validateIdParam, currencyControllers.deleteCurrency);

// Fetch
router.get("/", currencyControllers.getCurrencies);

router.get("/:id", validateIdParam, currencyControllers.getCurrencyById);

router.get("/code/:code", currencyControllers.fetchCurrencyByCode);

export default router;
