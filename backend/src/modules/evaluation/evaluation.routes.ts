import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import {
  evaluateInterviewController,
  getEvaluationController,
} from "./evaluation.controller";

const router = Router();

router.post(
  "/:sessionId",
  authMiddleware,
  evaluateInterviewController
);

router.get(
  "/:sessionId",
  authMiddleware,
  getEvaluationController
);

export default router;