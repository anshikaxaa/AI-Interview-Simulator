import { Request, Response, NextFunction } from "express";
import { interviewSessionService } from "./interviewSession.service";

class InterviewSessionController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const session = await interviewSessionService.createInterviewSession(
        req.user!.id,
        req.body
      );

      res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const interviewSessionController =
  new InterviewSessionController();