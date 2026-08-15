import prisma from "../../shared/db/prisma";
import { AppError } from "../../shared/errors/AppError";
import { evaluationResultSchema } from "./evaluation.schema";
import type { EvaluationResult } from "./interfaces/evaluation.interface";
import type { EvaluationPromptContext } from "./prompt/evaluationPrompt.interface";
import { buildEvaluationPrompt } from "./prompt/evaluationPromptBuilder";
import { generateEvaluation } from "./services/gemini.service";
import type { InterviewBlueprintData } from "../interviewBlueprint/interfaces/blueprint.interface";
import {interviewBlueprintDataSchema,} from "../interviewBlueprint/interviewBlueprint.schema";

function getQuestionTextFromBlueprint(
  blueprintData: unknown,
  questionIndex: number
): string {
  const parsedBlueprint =
    interviewBlueprintDataSchema.safeParse(blueprintData);

  if (!parsedBlueprint.success) {
    throw new AppError(
      "Invalid interview blueprint data",
      500
    );
  }

  const questions = parsedBlueprint.data.sections.flatMap(
    (section) => section.questions
  );

  return (
    questions[questionIndex]?.question.trim() ||
    `Question ${questionIndex + 1}`
  );
}

export async function evaluateInterview(
  interviewSessionId: string,
  userId: string
): Promise<EvaluationResult> {
  const interviewSession = 
  await prisma.interviewSession.findUnique({
    where: {
      id: interviewSessionId,
      userId,
    },
    include: {
      blueprint: {
        include: {
          resume: true,
          jobDescription: true,
        },
      },
      answers: {
        orderBy: {
          questionIndex: "asc",
        },
      },
    },
  });

  if (!interviewSession) {
    throw new AppError("Interview session not found", 404);
  }

  if (interviewSession.status !== "COMPLETED") {
  throw new AppError(
    "Interview session is not completed",
    400
    );
  }

  const existingEvaluation =
  await prisma.interviewEvaluation.findUnique({
    where: {
      sessionId: interviewSession.id,
    },
  });

  if (existingEvaluation) {
    throw new AppError(
      "Interview evaluation already exists",
      409
    );
  }

  if (!interviewSession.blueprint.resume?.parsedText) {
    throw new AppError("Interview resume text not found", 500);
  }

  if (!interviewSession.blueprint.jobDescription?.parsedText) {
    throw new AppError("Job description text not found", 500);
  }

  if (interviewSession.answers.length === 0) {
    throw new AppError("No interview answers were found", 400);
  }

  const promptContext: EvaluationPromptContext = {
    resumeText: interviewSession.blueprint.resume.parsedText,
    jobDescriptionText: interviewSession.blueprint.jobDescription.parsedText,
    responses: interviewSession.answers.map((answer) => ({
      question: getQuestionTextFromBlueprint(
        // blueprintData can be stored as JSON and may be null; ensure proper typing
        interviewSession.blueprint.blueprintData as unknown as InterviewBlueprintData,
        answer.questionIndex
      ),
      answer: answer.answerText,
    })),
  };

  const prompt = buildEvaluationPrompt(promptContext);
  const rawResponse = await generateEvaluation(prompt);

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(rawResponse);
  } catch {
    throw new AppError("Invalid response returned by Gemini", 500);
  }

  const evaluation = evaluationResultSchema.parse(parsedResponse);

  await prisma.interviewEvaluation.create({
    data: {
      sessionId: interviewSession.id,
      overallScore: evaluation.overall.score,
      feedback: evaluation,
    },
  });

  return evaluation;
}

export async function getEvaluation(
  interviewSessionId: string,
  userId: string
): Promise<EvaluationResult> {
  const evaluation = await prisma.interviewEvaluation.findFirst({
    where: {
      sessionId: interviewSessionId,
      session: {
        userId,
      },
    },
  });

  if (!evaluation) {
    throw new AppError(
      "Interview evaluation not found",
      404
    );
  }

  return evaluationResultSchema.parse(evaluation.feedback);
}