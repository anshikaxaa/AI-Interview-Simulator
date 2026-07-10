import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { validateRequest } from "../../../shared/middleware/validateRequest";

import { createJobDescriptionSchema } from "../schemas/jobDescription.schema";
import { jobDescriptionUpload } from "../jobDescription.upload";
import { jobDescriptionController } from "../controllers/jobDescription.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  jobDescriptionUpload.single("file"),
  validateRequest(createJobDescriptionSchema),
  jobDescriptionController.create
);

export default router;