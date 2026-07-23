import prisma from "../../shared/db/prisma";
import { CreateInterviewSessionInput } from "./interviewSession.schema";
import { AppError } from "../../shared/errors/AppError";

export class InterviewSessionService {
  async createInterviewSession(
    userId: string,
    data: CreateInterviewSessionInput
  ) {
    const blueprint = await prisma.interviewBlueprint.findFirst({
      where: {
        id: data.blueprintId,
      },
    });
    if (!blueprint) {
      throw new AppError("Interview blueprint not found.", 404);
    }

    if (blueprint.status !== "COMPLETED") {
      throw new AppError(
        "Interview can only be started from a completed blueprint.",
        400
      );
    }

    const existingSession = await prisma.interviewSession.findFirst({
      where: {
        userId,
        blueprintId: blueprint.id,
        status: "IN_PROGRESS",
      },
    });

    if (existingSession) {
      throw new AppError(
        "An interview session is already in progress for this blueprint.",
        409
      );
    }

    const interviewSession = await prisma.interviewSession.create({
      data: {
        userId,
        blueprintId: blueprint.id,
      },
    });

    return interviewSession;
  }
}

export const interviewSessionService = new InterviewSessionService();