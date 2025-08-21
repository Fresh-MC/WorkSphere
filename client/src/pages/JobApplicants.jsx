import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/applications/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        applicants.map((app) => (
          <div key={app._id} className="border p-4 rounded-lg mb-4">
            <h3 className="font-semibold">{app.user?.name}</h3>
            <p className="text-gray-600">{app.coverLetter}</p>
            <p className="mt-2"><strong>Email:</strong> {app.user?.email}</p>
            <p className="mt-2"><strong>Bio:</strong> {app.user?.bio}</p>
            <p className="mt-2"><strong>Skills:</strong> {app.user?.skills?.join(", ")}</p>

            {app.user?.portfolio && (
              <a
                href={app.user.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Portfolio
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobApplicants;
