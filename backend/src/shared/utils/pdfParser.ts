import fs from "fs/promises";
import pdfParse from "pdf-parse";

export async function parsePDF(filePath: string): Promise<string> {
  try {
    // Read the uploaded PDF file
    const fileBuffer = await fs.readFile(filePath);

    // Extract text from the PDF
    const parsed = await pdfParse(fileBuffer);

    // Clean and normalize the extracted text
    const normalizedText = parsed.text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Reject empty or image-only PDFs
    if (!normalizedText) {
      throw new Error("No text could be extracted from the PDF.");
    }

    return normalizedText;
  } catch (error) {
  throw new Error(
    `Failed to parse PDF: ${
      error instanceof Error ? error.message : "Unknown error"
    }`
  );
}
}