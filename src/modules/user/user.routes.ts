import { Router } from "express";
import * as userControllers from "./user.controllers";
import { verifyCookie } from "../../middlewares/cookie.middleware";

const router = Router();
router.post("/signup", userControllers.signupController);
router.get("/profile", verifyCookie, userControllers.profile);

export default router;
