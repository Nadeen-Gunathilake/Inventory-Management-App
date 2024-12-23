import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/login",UserController.login);

router.post("/logout",UserController.logout);

router.post("/",UserController.createUser);

router.patch("/:userId",UserController.UpdateUser);

router.delete("/:userId",UserController.deleteUser);

export default router;