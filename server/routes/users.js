import express from "express";
import { getUser, getUserFriends, addRemveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import router from "./auth.js";

const routers = express.Router();

// todo: read
routers.get("/:id", verifyToken, getUser);
routers.get("/:id/friends", verifyToken, getUserFriends);

// todo: update
routers.patch("/:id/:friendId", verifyToken, addRemveFriend);

export default routers;
