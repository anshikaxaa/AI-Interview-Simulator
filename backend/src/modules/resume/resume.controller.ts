import { NextFunction, Request, Response } from "express";
import { resumeService } from "./resume.service";

export class ResumeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const file = req.file;
      const userId = req.user?.id ?? req.user?.userId;

      if (!file || !userId) {
        throw new Error("Resume file and authenticated user are required");
      }

      const resume = await resumeService.createResume({ title, userId, file });

      res.status(201).json({
    success: true,
    message: "Resume uploaded successfully.",
    data: {
        id: resume.id,
        title: resume.title,
        originalFileName: resume.originalFileName,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
  },
});
    } catch (error) {
      next(error);
    }
  }

  async getUserResumes(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id ?? req.user?.userId;

      if (!userId) {
        throw new Error("Authenticated user is required");
      }

      const resumes = await resumeService.getUserResumes(userId);

      res.status(200).json({
        success: true,
        data: resumes,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();
