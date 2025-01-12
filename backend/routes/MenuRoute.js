import express from "express";
import { GetAllMenu, CreateNewMenuItem, GetMenuById, UpdateMenu, DeleteMenu, SearchItem } from "../controllers/MenuContro.js";
const router = express.Router();
import authenticate from "../middelware/authenticate.js";
// Routes
router.route("/searchitem").get(SearchItem);
router.route("/").post(authenticate, CreateNewMenuItem);
router.route("/").get( GetAllMenu);
router.route("/:id").get(authenticate, GetMenuById);
router.route("/:id").put(authenticate, UpdateMenu);
router.route("/:id").delete(authenticate, DeleteMenu);

export default router;