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
        await interviewBlueprintService.createInterviewBlueprint(
            req.user!.id,
            req.body
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async generateBlueprint(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const blueprintId = String(req.params.id);
      const result =
        await interviewBlueprintService.generateBlueprint(
          req.user!.id,
          blueprintId
        );

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