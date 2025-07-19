// src/services/aiResume.js
export const generateOptimizedResume = async (
  candidateDetails,
  jobDescription
) => {
  try {
    const response = await fetch("/api/ai-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidateDetails, jobDescription }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate optimized resume");
    }

    const data = await response.json();
    return data.resume || "Error: No resume generated.";
  } catch (error) {
    console.error("AI Resume Error:", error);
    return "An error occurred while generating your resume.";
  }
};
