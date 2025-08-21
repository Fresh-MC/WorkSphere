import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Job from "../models/Job.js";

const router = express.Router();

// Client posts a job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Only clients can post jobs" });
    }

    const job = await Job.create({
      title,
      description,
      budget,
      deadline,
      client: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Freelancers view all jobs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find().populate("client", "email displayName");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("client", "displayName email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
});
export default router;
