import { z } from "zod";

export const createJobDescriptionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required."),

    companyName: z
      .string()
      .trim()
      .optional(),
  }),
});