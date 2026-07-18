import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { interviewBlueprintController } from "./interviewBlueprint.controller";
import { createInterviewBlueprintSchema } from "./interviewBlueprint.schema";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateRequest(createInterviewBlueprintSchema),
  interviewBlueprintController.createInterviewBlueprint
);

router.post(
  "/:id/generate",
  authMiddleware,
  interviewBlueprintController.generateBlueprint
);

export default router;
