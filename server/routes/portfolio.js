import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add portfolio item
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, link, image } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.portfolio.push({ title, description, link, image });
    await user.save();

    res.status(201).json({ message: "Portfolio item added", portfolio: user.portfolio });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get user's portfolio
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("portfolio name");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.portfolio);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
