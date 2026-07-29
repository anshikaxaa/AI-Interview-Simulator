import prisma from "../../shared/db/prisma";
import { AppError } from "../../shared/errors/AppError";
import { CreateAnswerInput } from "./answer.schema";
import { BlueprintData } from "../../shared/types/blueprint";

export class AnswerService {
  async createAnswer(
    userId: string,
    sessionId: string,
    data: CreateAnswerInput
  ) {
    
    const session = await prisma.interviewSession.findUnique({
  where: {
    id: sessionId,
  },
  include: {
    blueprint: true,
  },
});

    if (!session) {
      throw new AppError("Interview session not found.", 404);
    }

    if (session.userId !== userId) {
      throw new AppError(
        "You are not authorized to access this interview session.",
        403
      );
    }

    if (session.status !== "IN_PROGRESS") {
      throw new AppError(
        "Interview session is not in progress.",
        400
      );
    }

    if (!session.blueprint.blueprintData) {
    throw new AppError("Interview blueprint data not found.", 500);
  }

    const blueprint =
      session.blueprint.blueprintData as unknown as BlueprintData;

    const totalQuestions = blueprint.sections.reduce(
      (total, section) => total + section.questions.length,
      0
    );

    const answer = await prisma.$transaction(async (tx) => {
      const currentQuestionIndex = session.currentQuestionIndex;
      const createdAnswer = await tx.interviewAnswer.create({
        data: {
          answerText: data.answerText,
          questionIndex: currentQuestionIndex,
          sessionId: session.id,
        },
      });

      await tx.interviewSession.update({
        where: {
          id: session.id,
        },
        data: {
          currentQuestionIndex: {
            increment: 1,
          },
        },
      });

      if (currentQuestionIndex + 1 === totalQuestions) {
        await tx.interviewSession.update({
          where: {
            id: session.id,
          },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        });
      }

      return createdAnswer;
    });

    return answer;
  }
}

export const answerService = new AnswerService();