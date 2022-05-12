import express from "express";
import * as controller from "../controllers/ticket-controller.js";

const router = express.Router();

// routes for post and get
router.route("/tickets").post(controller.post).get(controller.index);

// routes for update, delete and get with an id
router.route("/tickets/:id").get(controller.get).put(controller.update).delete(controller.remove);

export default router;

// create a ticket
// edit a ticket
// get a ticket details
// get all tickets
