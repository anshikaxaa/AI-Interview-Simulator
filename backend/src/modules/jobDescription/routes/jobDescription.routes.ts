import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { validateMultipartRequest } from "../../../shared/middleware/validateMultipartRequest";
import { createJobDescriptionSchema } from "../schemas/jobDescription.schema";
import { jobDescriptionUpload } from "../jobDescription.upload";
import { jobDescriptionController } from "../controllers/jobDescription.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  jobDescriptionUpload.single("file"),
  validateMultipartRequest(createJobDescriptionSchema),
  jobDescriptionController.create
);

router.get(
  "/",
  authMiddleware,
  jobDescriptionController.list
);

export default router;