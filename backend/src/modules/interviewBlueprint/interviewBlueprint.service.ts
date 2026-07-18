import prisma from "../../shared/db/prisma";
import { CreateInterviewBlueprintInput } from "./interviewBlueprint.types";
import { blueprintGeneratorService } from "./blueprintGenerator.service";
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

    const jobDescription = await prisma.jobDescription.findFirst({
      where: { id: jobDescriptionId, userId },
    });

    if (!jobDescription) {
      throw new AppError("Job description not found", 404);
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

  async generateBlueprint(userId: string, blueprintId: string) {
    const blueprint = await prisma.interviewBlueprint.findFirst({
      where: { 
        id: blueprintId, 
        userId 
      },
    });

    if (!blueprint) {
      throw new AppError(
        "Interview blueprint not found", 
        404
      );
    }

    const resume = await prisma.resume.findUnique({
      where: {
       id: blueprint!.resumeId,
      },
});

    if (!resume) {
    throw new AppError(
      "Resume not found", 
      404
    );
  }

const jobDescription = await prisma.jobDescription.findUnique({
  where: {
    id: blueprint!.jobDescriptionId,
  },
});

    if (!jobDescription) {
      throw new AppError(
        "Job description not found", 
        404
      );
}

    if (!blueprint) {
      throw new AppError(
        "Interview blueprint not found", 
        404
      );
    }

    await prisma.interviewBlueprint.update({
      where: {
        id: blueprint.id,
    },
      data: {
        status: "GENERATING",
        generationStartedAt: new Date(),
    },
});

const generatedBlueprint =
  await blueprintGeneratorService.generateInterviewBlueprint(
    resume.parsedText,
    jobDescription.parsedText
  );

  await prisma.interviewBlueprint.update({
    where: {
      id: blueprint.id,
    },
    data: {
      blueprintData: generatedBlueprint,
      status: "COMPLETED",
      generationCompletedAt: new Date(),
    },
  });

    return generatedBlueprint;
  }
}

export const interviewBlueprintService = new InterviewBlueprintService();
