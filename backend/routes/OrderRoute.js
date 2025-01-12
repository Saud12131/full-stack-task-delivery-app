import express from "express";
import { CreateOrder, GetOrderByUserId } from "../controllers/OrderContro.js";
import authenticate from "../middelware/authenticate.js";
const router = express.Router();

// Routes
router.route("/").post(authenticate,CreateOrder);
router.route("/yourorders").get(authenticate,GetOrderByUserId);


export default router;