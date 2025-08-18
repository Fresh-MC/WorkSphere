// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String },
    role: { type: String, enum: ["freelancer", "client"], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
