import express from "express";
import * as controller from "../controllers/project-controller.js";

const router = express.Router();

// routes for post and get
router.route("/projects").post(controller.post).get(controller.index);

// routes for update, delete and get with an id
router.route("/projects/:id").get(controller.get).put(controller.update);

export default router;


