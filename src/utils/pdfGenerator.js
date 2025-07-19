// src/utils/pdfGenerator.js
import html2pdf from "html2pdf.js";

/**
 * Converts AI-generated resume (Markdown/HTML) into a PDF for download.
 * @param {string} content - The AI resume as HTML or Markdown.
 * @param {string} filename - The desired PDF file name.
 */
export const exportResumeToPDF = (content, filename = "Optimized_Resume.pdf") => {
  try {
    const element = document.createElement("div");
    element.innerHTML = content; // Insert AI-generated HTML
    document.body.appendChild(element);

    const options = {
      margin: 0.5,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save().then(() => {
      document.body.removeChild(element);
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
};
