import { Request, Response, NextFunction } from "express";
import { answerService } from "./answer.service";
import { AppError } from "../../shared/errors/AppError";

class AnswerController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sessionId = req.params.sessionId;

      if (!sessionId || Array.isArray(sessionId)) {
        throw new AppError("Invalid session ID.", 400);
      }

      const answer = await answerService.createAnswer(
        req.user!.id,
        sessionId,
        req.body
      );

      res.status(201).json({
        success: true,
        data: answer,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const answerController = new AnswerController();