import prisma from "../../shared/db/prisma";
import { AppError } from "../../shared/errors/AppError";
import { CreateAnswerInput } from "./answer.schema";

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

    const answer = await prisma.$transaction(async (tx) => {
      const createdAnswer = await tx.interviewAnswer.create({
        data: {
          answerText: data.answerText,
          questionIndex: session.currentQuestionIndex,
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

      return createdAnswer;
    });

    return answer;
  }
}

export const answerService = new AnswerService();