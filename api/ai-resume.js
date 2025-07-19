// /api/ai-resume.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { resumeText, jobDescription } = req.body;

  if (!process.env.HF_API_KEY) {
    return res.status(500).json({ error: "Hugging Face API key missing" });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2", // lightweight model for demo
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Optimize this resume for the job:\n\nJob: ${jobDescription}\n\nResume: ${resumeText}`,
          parameters: { max_new_tokens: 150 },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Hugging Face request failed");
    }

    const generated =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : "Could not generate resume text";

    res.status(200).json({ optimizedResume: generated });
  } catch (err) {
    console.error("AI Resume Error:", err);
    res.status(500).json({ error: "Failed to generate optimized resume" });
  }
}
