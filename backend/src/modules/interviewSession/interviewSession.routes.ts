import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { createInterviewSessionSchema } from "./interviewSession.schema";
import { interviewSessionController } from "./interviewSession.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequest(createInterviewSessionSchema),
  interviewSessionController.create
);

export default router;