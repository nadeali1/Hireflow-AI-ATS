import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    company: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      default: "Full-time",
    },
    applicationDate: { type: Date, default: Date.now },
    jobUrl: { type: String, default: "" },
    salary: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Interview", "Offer", "Rejected"],
      default: "Saved",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
