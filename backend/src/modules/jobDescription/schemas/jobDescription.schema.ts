import { z } from "zod";

export const createJobDescriptionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required."),

  companyName: z
    .string()
    .trim()
    .optional(),
});

export const updateJobDescriptionSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title cannot be empty.")
      .optional(),

    companyName: z
      .string()
      .trim()
      .transform((value: string) => value || null)
      .optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.companyName !== undefined,
    {
      message: "At least one field must be provided.",
    }
  );