import { z } from "zod";

export const createInterviewSessionSchema = z.object({
  body: z.object({
    blueprintId: z.string().cuid(),
  }),
});

export type CreateInterviewSessionInput = z.infer<
  typeof createInterviewSessionSchema
>["body"];