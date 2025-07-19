import { useState } from "react";
import { DashboardNav, JobList } from "../components/dashboard";
import { ResumeAssistant } from "../components/ai";
import { parseSkills } from "../utils/skillParser";
import parseResume from "../services/ocr";

const StudentDashboard = ({ onLogout }) => {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobDescription, setJobDescription] = useState("");

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Run OCR once
    const {
      email,
      phone,
      skills: ocrSkills,
      rawText,
    } = await parseResume(file);

    // console.log("Extracted Data:", { email, phone, ocrSkills });
    // console.log("Full OCR Text:", rawText);

    // Save full text for AI resume optimization
    setResumeText(rawText);

    // Combine OCR skills with parsed keywords from the full text
    const extractedSkills = [
      ...new Set([...ocrSkills, ...parseSkills(rawText)]),
    ];
    setSkills(extractedSkills);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <DashboardNav role="student" onLogout={onLogout} />

      <div className="max-w-5xl mx-auto p-6">
        {/* Upload Resume */}
        <div className="bg-white p-4 shadow rounded mb-6">
          <h2 className="text-xl font-bold mb-3">Upload Your Resume</h2>
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleResumeUpload}
            className="mb-3"
          />
          {skills.length > 0 && (
            <div className="mt-2 text-sm text-gray-700">
              <strong>Extracted Skills:</strong> {skills.join(", ")}
            </div>
          )}
        </div>

        {/* Job Listings */}
        <JobList showApply={true} />

        {/* AI Resume Assistant */}
        <div className="mt-6 bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Optimize Your Resume</h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to tailor your resume"
            className="border p-2 w-full rounded mb-3"
            rows={4}
          />
          <ResumeAssistant
            candidateDetails={{ resumeText, skills }}
            jobDescription={jobDescription}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
