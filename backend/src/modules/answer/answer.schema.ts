import { z } from "zod";

export const createAnswerSchema = z.object({
  body: z.object({
    answerText: z
      .string()
      .trim()
      .min(1, "Answer cannot be empty.")
      .max(10000, "Answer cannot exceed 10000 characters."),
  }),
});