import { z } from "zod";

const interviewQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  category: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),

  expectedDuration: z.number(),

  skillsAssessed: z.array(z.string()),

  expectedAnswerPoints: z.array(z.string()),
  followUpQuestions: z.array(z.string()),
  evaluationCriteria: z.array(z.string()),
});

const interviewSectionSchema = z.object({
  title: z.string(),
  duration: z.number(),
  questions: z.array(interviewQuestionSchema),
});

export const interviewBlueprintResponseSchema = z.object({
  title: z.string(),
  role: z.string(),
  company: z.string(),

  overallDifficulty: z.enum(["Easy", "Medium", "Hard"]),

  estimatedDuration: z.number(),

  instructions: z.array(z.string()),

  sections: z.array(interviewSectionSchema),
});

export type InterviewBlueprintResponse = z.infer<
  typeof interviewBlueprintResponseSchema
>;