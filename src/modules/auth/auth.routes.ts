import { Router } from "express";
import * as authControllers from "./auth.controllers";
import { authSecure } from "./auth.middlewares";

const router = Router();
router.post("/login", authSecure, authControllers.login);

export default router;
