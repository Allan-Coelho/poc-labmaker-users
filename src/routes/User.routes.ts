import express from "express";
import * as user_controller from "../controllers/User.controller.js";
import { html_sanitizer } from "../middlewares/html_sanitizer.middleware.js";
import { schemaValidation } from "../middlewares/schema_validation.middleware.js";

const router = express.Router();

router.post(
  "/users/sign-up",
  html_sanitizer,
  schemaValidation,
  user_controller.sign_up
);

export default router;
