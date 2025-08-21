import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js"; // import after dotenv if needed
import applicationRoutes from "./routes/applicationRoutes.js";




dotenv.config();
const app = express(); // <-- define app first




// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes); // <-- use after app is initialized
app.use("/api/applications", applicationRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
