import { Request, Response } from "express";
import {
  evaluateInterview,
  getEvaluation,
} from "./evaluation.service";

export async function evaluateInterviewController(
  req: Request,
  res: Response
) {
  const sessionId = Array.isArray(req.params.sessionId)
    ? req.params.sessionId[0]
    : req.params.sessionId;

  const userId = req.user!.userId;

  const evaluation = await evaluateInterview(
    sessionId,
    userId
  );

  return res.status(201).json({
    success: true,
    data: evaluation,
  });
}

export async function getEvaluationController(
  req: Request,
  res: Response
) {
  const sessionId = Array.isArray(req.params.sessionId)
    ? req.params.sessionId[0]
    : req.params.sessionId;

  const userId = req.user!.userId;

  const evaluation = await getEvaluation(
    sessionId,
    userId
  );

  return res.status(200).json({
    success: true,
    data: evaluation,
  });
}