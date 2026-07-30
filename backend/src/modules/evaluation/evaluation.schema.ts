import { z } from "zod";

export const assessmentSchema = z.enum([
  "STRONG",
  "GOOD",
  "BORDERLINE",
  "NEEDS_IMPROVEMENT",
]);

export const evaluationOverallSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().trim().min(1),
});

export const evaluationCategoryScoresSchema = z.object({
  technicalKnowledge: z.number().min(0).max(100),
  communication: z.number().min(0).max(100),
  problemSolving: z.number().min(0).max(100),
});

export const evaluationAssessmentSchema = z.object({
  assessment: assessmentSchema,
  reason: z.string().trim().min(1),
});

export const questionFeedbackSchema = z.object({
  questionIndex: z.number().int().min(0),
  score: z.number().min(0).max(100),
  feedback: z.string().trim().min(1),
});

export const evaluationResultSchema = z.object({
  overall: evaluationOverallSchema,
  categoryScores: evaluationCategoryScoresSchema,
  assessment: evaluationAssessmentSchema,
  strengths: z.array(z.string().trim().min(1)).min(1).max(5),
  areasForImprovement: z.array(z.string().trim().min(1)).min(1).max(5),
  recommendations: z.array(z.string().trim().min(1)).min(1).max(5),
  questionFeedback: z.array(questionFeedbackSchema).min(1),
});