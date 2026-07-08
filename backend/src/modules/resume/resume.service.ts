import fs from "fs/promises";

import prisma from "../../shared/db/prisma";
import { parsePDF } from "../../shared/utils/pdfParser";

import { CreateResumeDTO } from "./resume.types";
import { AppError } from "../../shared/errors/AppError";

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


  async deleteResume(userId: string, resumeId: string){
    const resume = await prisma.resume.findUnique({
      where: { 
        id: resumeId 
      },
      select: {
        id: true,
        userId: true,
        filePath: true,
      },
    });

    if (!resume) {
      throw new AppError("Resume not found.", 404);
    }

    if (resume.userId !== userId) {
      throw new AppError(
        "You are not allowed to delete this resume.",
        403
      );
    }

    await fs.unlink(resume.filePath);
    await prisma.resume.delete({
      where: { id: resumeId },
    });
  }

}

export const resumeService = new ResumeService();