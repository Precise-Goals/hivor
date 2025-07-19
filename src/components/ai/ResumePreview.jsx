// src/components/ai/ResumePreview.jsx
import { exportResumeToPDF } from "../../utils/pdfGenerator";

const ResumePreview = ({ resumeText }) => {
  const handleDownload = () => {
    exportResumeToPDF(resumeText, "AI_Optimized_Resume.pdf");
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <pre className="whitespace-pre-wrap text-sm bg-white p-2 border rounded">
        {resumeText}
      </pre>
      <button
        onClick={handleDownload}
        className="mt-3 bg-green-600 text-white px-3 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
