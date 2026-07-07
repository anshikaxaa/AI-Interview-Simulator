import fs from "fs/promises";
import pdfParse from "pdf-parse";
import { AppError } from "../errors/AppError";

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
      throw new AppError(
        "No readable text could be extracted from the uploaded PDF. Please upload a text-based PDF.",
        400
      );
    }

    return normalizedText;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error(error);

    throw new AppError("Failed to parse PDF.", 500);
  }
}