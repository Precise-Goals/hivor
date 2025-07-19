import Tesseract from "tesseract.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: "Missing image" });
  }

  try {
    const result = await Tesseract.recognize(imageBase64, "eng");
    return res.status(200).json({ text: result.data.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OCR failed" });
  }
}
