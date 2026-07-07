import fs from "fs/promises";

import prisma from "../../shared/db/prisma";
import { parsePDF } from "../../shared/utils/pdfParser";

import { CreateResumeDTO } from "./resume.types";

export class ResumeService {
  async createResume(data: CreateResumeDTO) {
    const { title, userId, file } = data;

    try {
      // Extract text from the uploaded PDF
      const parsedText = await parsePDF(file.path);

      // Save resume to the database
      const resume = await prisma.resume.create({
        data: {
          title,
          originalFileName: file.originalname,
          filePath: file.path,
          mimeType: file.mimetype,
          fileSize: file.size,
          parsedText,
          userId,
        },
      });

      return resume;
    } catch (error) {
      // Delete uploaded file if anything fails
      await fs.unlink(file.path).catch(() => {});

      throw error;
    }
  }
}

export const resumeService = new ResumeService();