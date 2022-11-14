import express from "express";
import * as user_controller from "../controllers/User.controller.js";
import { html_sanitizer } from "../middlewares/html_sanitizer.middleware.js";
import { schemaValidation } from "../middlewares/schema_validation.middleware.js";
var router = express.Router();
router.get("/users/count", user_controller.count_users);
router.post("/users/sign-up", html_sanitizer, schemaValidation, user_controller.sign_up);
router.put("/users/permissions", html_sanitizer, schemaValidation, user_controller.update_user_permission);
router["delete"]("/users/:id", html_sanitizer, schemaValidation, user_controller.delete_user);
router.get("/users/:id", html_sanitizer, schemaValidation, user_controller.get_user);
router.get("/users", html_sanitizer, schemaValidation, user_controller.get_user_by_name);
export default router;