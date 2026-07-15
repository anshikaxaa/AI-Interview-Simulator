import { Router } from "express";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { validateMultipartRequest } from "../../../shared/middleware/validateMultipartRequest";
import { createJobDescriptionSchema } from "../schemas/jobDescription.schema";
import { jobDescriptionUpload } from "../jobDescription.upload";
import { jobDescriptionController } from "../controllers/jobDescription.controller";
import { updateJobDescriptionSchema } from "../schemas/jobDescription.schema";
import { deleteJobDescriptionService } from "../services/deleteJobDescription.service";
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

router.get(
  "/:id",
  authMiddleware,
  jobDescriptionController.getById
);

router.patch(
  "/:id",
  authMiddleware,
  validateMultipartRequest(updateJobDescriptionSchema),
  jobDescriptionController.update
);

router.delete(
  "/:id",
  authMiddleware,
  jobDescriptionController.delete
);

export default router;