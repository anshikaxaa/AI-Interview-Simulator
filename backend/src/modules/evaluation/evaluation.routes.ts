import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { evaluateInterviewController } from "./evaluation.controller";

const router = Router();

router.post(
  "/:sessionId",
  authMiddleware,
  evaluateInterviewController
);

export default router;