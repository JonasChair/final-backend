import express from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { POST_QUESTION, DELETE_QUESTION } from "../controllers/question.js";

const router = express.Router();

router.post("/", authenticateUser, POST_QUESTION);
router.delete("/:id", authenticateUser, DELETE_QUESTION);

export default router;