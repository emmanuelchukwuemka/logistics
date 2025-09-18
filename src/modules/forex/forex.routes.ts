import { Router } from "express";
import * as forexControllers from "./forex.controllers";

const router = Router();

router.post("/", forexControllers.updateExchangeRates);
router.get("/", forexControllers.getExchangeRates);
router.get("/:code", forexControllers.getExchangeRatesByCode);

export default router;
