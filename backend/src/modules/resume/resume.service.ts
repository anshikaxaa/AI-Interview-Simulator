import fs from "fs/promises";

import prisma from "../../shared/db/prisma";
import { parsePDF } from "../../shared/utils/pdfParser";

import { CreateResumeDTO } from "./resume.types";

export class ResumeService {
  async createResume(data: CreateResumeDTO) {
    const { title, userId, file } = data;

    try {
      const parsedText = await parsePDF(file.path);

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
      await fs.unlink(file.path).catch(() => {});

      throw error;
    }
  }

  async getUserResumes(userId: string) {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        originalFileName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export const resumeService = new ResumeService();