import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/geminiService.js";

export const analyzeResumeAgainstJob = async (req, res, next) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res
        .status(400)
        .json({ message: "Please paste a job description (at least a few sentences)." });
    }

    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(400).json({ message: "Upload a resume before running an analysis." });
    }
    if (!resume.textContent) {
      return res
        .status(400)
        .json({ message: "Couldn't read text from your resume PDF. Try re-uploading it." });
    }

    const analysis = await analyzeResume(resume.textContent, jobDescription);
    res.json({ analysis });
  } catch (error) {
    next(error);
  }
};
