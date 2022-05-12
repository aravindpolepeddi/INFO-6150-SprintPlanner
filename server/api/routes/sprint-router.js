import express from "express";
import * as controller from "../controllers/sprint-controller.js";

const router = express.Router();

// routes for post and get
router.route("/sprints").post(controller.post).get(controller.index);

// routes for update, delete and get with an id
router.route("/sprints/:id").get(controller.get).put(controller.update);

export default router;
