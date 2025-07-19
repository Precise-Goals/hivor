import Tesseract from "tesseract.js";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"; // Vite handles this

GlobalWorkerOptions.workerSrc = pdfWorker;

export const convertPdfToImage = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/png");
};

export const parseResume = async (file) => {
  try {
    let imageFile = file;

    // If PDF, convert to image first
    if (file.type === "application/pdf") {
      imageFile = await convertPdfToImage(file);
    }

    const result = await Tesseract.recognize(imageFile, "eng");
    const rawText = result.data.text;

    const email =
      rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] ||
      "";
    const phone = rawText.match(/\+?\d[\d -]{8,12}\d/)?.[0] || "";

    const skills =
      rawText
        .match(/(Python|Java|C\+\+|SQL|React|Node|ML|AI|Django)/gi)
        ?.map((s) => s.toLowerCase()) || [];

    return { email, phone, skills, rawText };
  } catch (err) {
    console.error("OCR Error:", err);
    return { email: "", phone: "", skills: [], rawText: "" };
  }
};

export default parseResume;
// This function handles both PDF and image files, extracting text using Tesseract.js
