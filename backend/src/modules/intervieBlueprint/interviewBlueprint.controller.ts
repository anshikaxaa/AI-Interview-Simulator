import { Request, Response, NextFunction } from "express";
import { interviewBlueprintService } from "./interviewBlueprint.service";

export class InterviewBlueprintController {
  async createInterviewBlueprint(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await interviewBlueprintService.createInterviewBlueprint();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const interviewBlueprintController =
  new InterviewBlueprintController();