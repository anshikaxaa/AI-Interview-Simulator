import prisma from "../../shared/db/prisma";
import { CreateInterviewBlueprintInput } from "./interviewBlueprint.types";

import { AppError } from "../../shared/errors/AppError";

export class InterviewBlueprintService {
  async createInterviewBlueprint(
    userId: string,
    data: CreateInterviewBlueprintInput
  ) {
    const { resumeId, jobDescriptionId } = data;

    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
    });
    
    if (!resume) {
      throw new AppError("Resume not found", 404);
}
    if (resume.userId !== userId) {
      throw new AppError("Unauthorized", 403);
}

    const jobDescription = await prisma.jobDescription.findUnique({
      where: {
        id: jobDescriptionId,
  },
});

    if (!jobDescription) {
      throw new AppError("Job description not found", 404);
}

    if (jobDescription.userId !== userId) {
      throw new AppError("Unauthorized", 403);
}
  const existingBlueprint = await prisma.interviewBlueprint.findFirst({
  where: {
    userId,
    resumeId,
    jobDescriptionId,
  },
});

  if (existingBlueprint) {
  throw new AppError("Interview blueprint already exists", 409);
}

  const blueprint = await prisma.interviewBlueprint.create({
  data: {
    userId,
    resumeId,
    jobDescriptionId,
    status: "PENDING",
  },
});

return blueprint;
  }
}

export const interviewBlueprintService = new InterviewBlueprintService();
