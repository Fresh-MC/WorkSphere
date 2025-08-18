// client/src/pages/PostJob.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect non-client users
  if (user?.role !== "client") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Access Denied</h2>
        <p>Only clients can post jobs.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/jobs",
        { title, description, budget, deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/home"); // redirect after posting
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          className="w-full px-4 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full px-4 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          className="w-full px-4 py-2 border rounded"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Deadline"
          className="w-full px-4 py-2 border rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
