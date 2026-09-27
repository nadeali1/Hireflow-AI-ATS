import express from "express";
import { analyzeResumeAgainstJob } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/analyze", protect, analyzeResumeAgainstJob);

export default router;
