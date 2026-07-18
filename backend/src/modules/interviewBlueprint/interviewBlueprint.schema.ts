import { z } from "zod";

export const createInterviewBlueprintSchema = z.object({
  resumeId: z.string().cuid(),
  jobDescriptionId: z.string().cuid(),
});
