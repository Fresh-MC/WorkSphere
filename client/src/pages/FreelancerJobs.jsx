import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function FreelancerJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {jobs.length === 0 && <p>No jobs posted yet.</p>}
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-700 mt-2">{job.description}</p>
            <p className="mt-1 text-gray-500">Budget: ${job.budget}</p>
            <p className="mt-1 text-gray-500">
              Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>
            <p className="mt-1 text-gray-500 text-sm">
              Posted by: {job.client.displayName || job.client.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
