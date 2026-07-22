import { z } from "zod";

export const createInterviewBlueprintSchema = z.object({
  body: z.object({
    resumeId: z.string().cuid(),
    jobDescriptionId: z.string().cuid(),
  }),
});

export type CreateInterviewBlueprintInput =
  z.infer<typeof createInterviewBlueprintSchema>["body"];