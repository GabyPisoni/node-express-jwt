import express from "express";
import {
  loginGet,
  loginPost,
  registerPost,
  logoutPost,
  protectedGet,
} from "../controllers/login.controller.js";
import { rateLimiterMiddleware } from "../middleware/rateLimiters.middleweare.js";

const router = express.Router();

router.get("/", loginGet);

router.post("/login", rateLimiterMiddleware, loginPost);

router.post("/register", registerPost);

router.post("/logout", logoutPost);

router.get("/protected", protectedGet);

export default router;
