import { z } from "zod";

export const createInterviewBlueprintSchema = z.object({
  body: z.object({
    resumeId: z.string().cuid(),
    jobDescriptionId: z.string().cuid(),
  }),
});

export type CreateInterviewBlueprintInput =
  z.infer<typeof createInterviewBlueprintSchema>["body"];

export const blueprintQuestionSchema = z.object({
  id: z.string(),
  category: z.string(),
  question: z.string().min(1),
  difficulty: z.string(),
  skillsAssessed: z.array(z.string()),
  expectedDuration: z.number(),
  followUpQuestions: z.array(z.string()),
  evaluationCriteria: z.array(z.string()),
  expectedAnswerPoints: z.array(z.string()),
});

export const blueprintSectionSchema = z.object({
  title: z.string(),
  duration: z.number(),
  questions: z.array(blueprintQuestionSchema),
});

export const interviewBlueprintDataSchema = z.object({
  role: z.string(),
  title: z.string(),
  company: z.string(),
  sections: z.array(blueprintSectionSchema),
  instructions: z.array(z.string()),
  estimatedDuration: z.number(),
  overallDifficulty: z.string(),
});

export type InterviewBlueprintData = z.infer<
  typeof interviewBlueprintDataSchema
>;