import express from "express";
import { Signup, Login } from "../controllers/AuthContro.js";
const router = express.Router();

// Routes
router.route("/signup").post(Signup);
router.route("/login").post(Login);

export default router;