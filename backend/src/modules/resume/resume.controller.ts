import { NextFunction, Request, Response } from "express";
import { resumeService } from "./resume.service";
import { AppError } from "../../shared/errors/AppError";

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

  async deleteResume(
    req: Request <{ id: string}>,
    res: Response,
    next: NextFunction
  ) 
  {
    try {
      const resumeId = req.params.id as string;
      const userId = req.user?.id ?? req.user?.userId;

      if (!resumeId || !userId) {
        throw new AppError(
          "Resume ID and authenticated user are required", 
          400
        );
      }

      await resumeService.deleteResume(userId, resumeId);

      res.status(200).json({
        success: true,
        message: "Resume deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();
