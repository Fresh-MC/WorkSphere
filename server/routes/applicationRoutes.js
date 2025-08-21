import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js"; // import User model for portfolio
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply to a job
router.post("/:jobId/apply", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;
    const userId = req.user._id; // ✅ valid only after authMiddleware

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const existing = await Application.findOne({ job: jobId, user: userId });
    if (existing) {
      // Fetch freelancer portfolio when already applied
      const portfolio = await User.findById(userId).select("name email portfolio skills bio");
      return res.status(400).json({
        message: "Already applied",
        portfolio,
      });
    }

    // Create new application
    const application = new Application({ job: jobId, user: userId, coverLetter });
    await application.save();

    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    res.status(500).json({ message: "Error applying to job", error: error.message });
  }
});

// Fetch applications for a job (for clients to view applicants + portfolios)
router.get("/:jobId/applications", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId }).populate(
      "user",
      "name email portfolio skills bio"
    );

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});

export default router;
