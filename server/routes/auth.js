import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
// server/routes/auth.js
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, displayName } = req.body;
    console.log("Signup payload:", req.body); // debug: see if role is coming

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role,         // must be included
      displayName,  // optional
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: { id: user._id, email: user.email, role: user.role, displayName: user.displayName },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Include role and displayName in the response
    res.json({
      user: { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        displayName: user.displayName 
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
