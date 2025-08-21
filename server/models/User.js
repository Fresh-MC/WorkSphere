import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["freelancer", "client"], required: true },

    // ✅ Portfolio field
    portfolio: [
      {
        title: { type: String, required: true },
        description: { type: String },
        link: { type: String },
        image: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
