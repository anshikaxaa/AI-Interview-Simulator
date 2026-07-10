import fs from "fs/promises";

import prisma from "../../../shared/db/prisma";
import { parsePDF } from "../../../shared/utils/pdf/pdfParser";
import { AppError } from "../../../shared/errors/AppError";

import { CreateJobDescriptionDTO } from "../types/jobDescription.types";

export class JobDescriptionService {
  async createJobDescription(data: CreateJobDescriptionDTO) {
    const {
      title,
      companyName,
      userId,
      file,
    } = data;

    try {
      const parsedText = await parsePDF(file.path);

      return prisma.jobDescription.create({
        data: {
          title,
          companyName,
          originalFileName: file.originalname,
          filePath: file.path,
          mimeType: file.mimetype,
          fileSize: file.size,
          parsedText,
          userId,
        },
      });
    } catch (error) {
      await fs.unlink(file.path).catch(() => {});
      throw error;
    }
  }
}

export const jobDescriptionService =
  new JobDescriptionService();