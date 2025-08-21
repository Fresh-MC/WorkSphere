import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`/api/portfolio/${user._id}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPortfolio();
  }, [user._id]);

  const addPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/portfolio/add",
        { title, description, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPortfolio(res.data.portfolio);
      setTitle("");
      setDescription("");
      setLink("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding portfolio");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      {/* Add Portfolio Item */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={addPortfolio}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      {/* Display Portfolio */}
      {Array.isArray(portfolio) && portfolio.length > 0 ? (
  portfolio.map((item, index) => (
    <div key={index} className="portfolio-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span>{item.skills?.join(", ")}</span>
    </div>
  ))
) : (
  <p>No portfolio items yet.</p>
)}
    </div>
  );
}
