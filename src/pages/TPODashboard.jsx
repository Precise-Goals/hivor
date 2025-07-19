import { useEffect, useState } from "react";
import {
  DashboardNav,
  AnalyticsWidget,
  StudentCard,
  JobList,
} from "../components/dashboard";
import { fetchStudents, saveJob } from "../services/storage";
import { exportToCSV } from "../utils/csvExport";

const TPODashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [deadline, setDeadline] = useState("");

  // Load students for TPO view
  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    loadStudents();
  }, []);

  // Filter students by skill keyword
  const filteredStudents = students.filter((s) =>
    s.skills?.join(" ").toLowerCase().includes(filter.toLowerCase())
  );

  // Handle new job posting
  const handlePostJob = async () => {
    if (!jobTitle || !company || !deadline) return;
    await saveJob({ title: jobTitle, company, deadline });
    alert("Job posted successfully!");
    setJobTitle("");
    setCompany("");
    setDeadline("");
  };

  // Export student data to CSV
  const handleExport = () => {
    exportToCSV(students, "student_placement_data.csv");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <DashboardNav role="tpo" onLogout={onLogout} />

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Job Posting Form */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-3">Post a New Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handlePostJob}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Job
          </button>
        </div>

        {/* Placement Analytics */}
        <AnalyticsWidget />

        {/* Student Filtering & Export */}
        <div className="bg-white p-4 shadow rounded">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Filter by skill (e.g., Python)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>

          {/* Student List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.length === 0 ? (
              <p>No students found.</p>
            ) : (
              filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))
            )}
          </div>
        </div>

        {/* Active Job Listings */}
        <JobList />
      </div>
    </div>
  );
};

export default TPODashboard;
