import prisma from "../../shared/db/prisma";
import { CreateInterviewSessionInput } from "./interviewSession.schema";

export class InterviewSessionService {
  async createInterviewSession(
    userId: string,
    data: CreateInterviewSessionInput
  ) {
    const blueprint = await prisma.interviewBlueprint.findUnique({
      where: {
        id: data.blueprintId,
      },
    });

    if (!blueprint) {
      throw new Error("Interview blueprint not found.");
    }

    if (blueprint.status !== "COMPLETED") {
  throw new Error("Interview can only be started from a completed blueprint.");
}
    
    return blueprint;
  }
}

export const interviewSessionService = new InterviewSessionService();