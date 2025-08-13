import express from "express";
import {
  getUsersForSidebar,
  deleteAccount,
  removeFriend,
  addFriend,
} from "../controllers/userControllers.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.delete("/delete-account", protectRoute, deleteAccount);
router.post("/unfriend/:id", protectRoute, removeFriend);
router.post("/add-friend/:id", protectRoute, addFriend);

export default router;
