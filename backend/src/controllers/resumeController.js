import fs from "fs";
import pdfParse from "pdf-parse";
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded. Please attach a PDF." });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    let textContent = "";
    try {
      const parsed = await pdfParse(dataBuffer);
      textContent = parsed.text.slice(0, 15000);
    } catch (e) {
      textContent = "";
    }

    const existing = await Resume.findOne({ user: req.user._id });
    if (existing) {
      if (fs.existsSync(existing.filePath)) {
        fs.unlinkSync(existing.filePath);
      }
      existing.fileName = req.file.originalname;
      existing.filePath = req.file.path;
      existing.fileSize = req.file.size;
      existing.textContent = textContent;
      existing.uploadedAt = new Date();
      await existing.save();
      return res.json({ resume: sanitize(existing) });
    }

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      textContent,
    });

    res.status(201).json({ resume: sanitize(resume) });
  } catch (error) {
    next(error);
  }
};

export const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "No resume uploaded yet." });
    }
    res.json({ resume: sanitize(resume) });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "No resume to delete." });
    }
    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }
    await resume.deleteOne();
    res.json({ message: "Resume deleted." });
  } catch (error) {
    next(error);
  }
};

export const downloadResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume || !fs.existsSync(resume.filePath)) {
      return res.status(404).json({ message: "Resume file not found." });
    }
    res.download(resume.filePath, resume.fileName);
  } catch (error) {
    next(error);
  }
};

function sanitize(resume) {
  return {
    id: resume._id,
    fileName: resume.fileName,
    fileSize: resume.fileSize,
    uploadedAt: resume.uploadedAt,
    hasTextContent: Boolean(resume.textContent),
  };
}
