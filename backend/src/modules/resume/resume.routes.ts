import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { resumeUpload } from "../../shared/middleware/upload/resumeUpload";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { resumeController } from "./resume.controller";
import { createResumeSchema } from "./resume.validation";

const router = Router();

router.get("/", authMiddleware, resumeController.getUserResumes);

router.post(
  "/",
  authMiddleware,
  resumeUpload.single("file"),
  validateRequest(createResumeSchema),
  resumeController.create
);

router.delete("/:id", authMiddleware, resumeController.deleteResume);

export default router;
