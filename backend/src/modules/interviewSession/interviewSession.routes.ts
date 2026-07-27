import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { createInterviewSessionSchema } from "./interviewSession.schema";
import { interviewSessionController } from "./interviewSession.controller";
import { createAnswerSchema } from "../answer/answer.schema";
import { answerController } from "../answer/answer.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequest(createInterviewSessionSchema),
  interviewSessionController.create
);

router.post(
  "/:sessionId/answers",
  authMiddleware,
  validateRequest(createAnswerSchema),
  answerController.create
);

export default router;