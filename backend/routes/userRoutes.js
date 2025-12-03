import express from "express";
import {
  getFriends,
  getAllUsersForFriendReq,
  deleteAccount,
  removeFriend,
  addFriend,
} from "../controllers/userControllers.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/friends", protectRoute, getFriends)
router.get("/all-users", protectRoute, getAllUsersForFriendReq);
router.delete("/delete-account", protectRoute, deleteAccount);
router.post("/unfriend/:id", protectRoute, removeFriend);
router.post("/add-friend/:id", protectRoute, addFriend);

export default router;
