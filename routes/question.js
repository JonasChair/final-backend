import express from "express";
import { authenticateUser } from "../middlewares/auth.js";
import { POST_QUESTION, DELETE_QUESTION, GET_ALL_QUESTIONS, POST_ANSWER, DELETE_ANSWER, GET_QUESTION_WITH_ANSWERS } from "../controllers/question.js";

const router = express.Router();

router.post("/", authenticateUser, POST_QUESTION);
router.get("/", GET_ALL_QUESTIONS);
router.post("/:id/answers", authenticateUser, POST_ANSWER);
router.delete("/answers/:id", authenticateUser, DELETE_ANSWER);
router.delete("/:id", authenticateUser, DELETE_QUESTION);
router.get("/:id", GET_QUESTION_WITH_ANSWERS);

export default router;