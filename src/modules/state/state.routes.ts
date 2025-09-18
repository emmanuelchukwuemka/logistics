import { Router } from "express";
import * as stateControllers from "./state.controllers";
import { validateCreatePayload, validateIdParam, validateStateUpdate } from "./state.middlewares";

const router = Router();
router.get("/", stateControllers.getStates);

router.get("/:id",validateIdParam, stateControllers.getStateById);

router.get("/country/:id",validateIdParam, stateControllers.getStatesByCountry);

router.post("/", validateCreatePayload, stateControllers.createState);

router.put("/:id", validateIdParam, validateStateUpdate, stateControllers.updateState);

router.delete("/:id", validateIdParam, stateControllers.deleteState);

export default router;
