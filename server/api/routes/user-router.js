import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  index,
} from "../controllers/user-controller.js";
import { protect } from "../controllers/authCheck.js";

const router = express.Router();

//routes for user login,registration, search 
router
  .post("/users/register", registerUser)
  .post("/users/login", loginUser)
  .get("/users/getMe", protect, getMe)
  .get("/users", index);

export default router;
