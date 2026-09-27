import express from "express";
import { uploadResume, getResume, deleteResume, downloadResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.use(protect);

router.get("/", getResume);
router.post("/", upload.single("resume"), uploadResume);
router.delete("/", deleteResume);
router.get("/download", downloadResume);

export default router;
