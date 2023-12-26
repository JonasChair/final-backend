import express from "express";
import {
    REGISTER_USER,
} from "../controllers/user.js";

const router = express.Router();

router.post("/register", REGISTER_USER);

export default router;