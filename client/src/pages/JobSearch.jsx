import { useEffect, useState } from "react";
import axios from "axios";

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Filters
  const [searchKeyword, setSearchKeyword] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/applications/my-applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(res.data.map(app => app.job._id)); // store jobIds
    } catch (err) {
      console.error(err);
    }
  };
  fetchAppliedJobs();
}, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleFilter = () => {
    let tempJobs = [...jobs];

    if (searchKeyword) {
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (minBudget) tempJobs = tempJobs.filter((job) => job.budget >= parseFloat(minBudget));
    if (maxBudget) tempJobs = tempJobs.filter((job) => job.budget <= parseFloat(maxBudget));
    if (deadline) tempJobs = tempJobs.filter(
      (job) => new Date(job.deadline) <= new Date(deadline)
    );

    setFilteredJobs(tempJobs);
  };

  const applyToJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
  `http://localhost:5000/api/applications/${jobId}/apply`,
  { coverLetter: "Excited to work on this!" },
  { headers: { Authorization: `Bearer ${token}` } }
);

      setAppliedJobs([...appliedJobs, jobId]);
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error applying to job");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Search & Filter Jobs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          className="border rounded px-3 py-2 w-32"
        />
        <input
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="border rounded px-3 py-2 w-32"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Jobs */}
      {filteredJobs.length === 0 ? (
        <p>No jobs match your criteria.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li key={job._id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-700 mt-2">{job.description}</p>
              <p className="mt-1 text-gray-500">Budget: ${job.budget}</p>
              <p className="mt-1 text-gray-500">
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Posted by: {job.client?.displayName || job.client?.email}
              </p>

              {/* Apply Button */}
              <button
                onClick={() => applyToJob(job._id)}
                disabled={appliedJobs.includes(job._id)}
                className={`mt-3 px-4 py-2 rounded-lg text-white ${
                  appliedJobs.includes(job._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
