// src/components/dashboard/JobList.jsx
import { useEffect, useState } from "react";
import { fetchJobs } from "../../services/storage";

const JobList = ({ showApply = false }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
    };
    loadJobs();
  }, []);

  return (
    <div className="mt-4 bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-3">Active Job Openings</h2>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id} className="border p-3 rounded shadow-sm">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-700">{job.company}</p>
              <p className="text-xs text-gray-500">Deadline: {job.deadline}</p>
              {showApply && (
                <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                  Apply
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
