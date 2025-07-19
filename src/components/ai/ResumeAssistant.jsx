// src/components/ai/ResumeAssistant.jsx
import { useState } from "react";
import { generateOptimizedResume } from "../../services/aiResume";
import ResumePreview from "./ResumePreview";

const ResumeAssistant = ({ candidateDetails, jobDescription }) => {
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    const optimizedResume = await generateOptimizedResume(candidateDetails, jobDescription);
    setResumeText(optimizedResume);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3">AI Resume Assistant</h2>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Optimized Resume"}
      </button>

      {resumeText && <ResumePreview resumeText={resumeText} />}
    </div>
  );
};

export default ResumeAssistant;
