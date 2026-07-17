import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import resumeRoutes from "./modules/resume/resume.routes";
import jobDescriptionRoutes from "./modules/jobDescription/routes/jobDescription.routes";
import interviewBlueprintRoutes from "./modules/intervieBlueprint/interviewBlueprint.routes";
import { errorHandler } from "./shared/middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/job-descriptions", jobDescriptionRoutes);
app.use("/api/interview-blueprints", interviewBlueprintRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Interview Simulator API is running",
  });
});

app.use(errorHandler);
export default app;