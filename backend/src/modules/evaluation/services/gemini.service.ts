import { GoogleGenAI } from "@google/genai";
import { evaluationResultSchema } from "../evaluation.schema";
import { z } from "zod";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const evaluationJsonSchema = z.toJSONSchema(evaluationResultSchema);

export async function generateEvaluation(
  prompt: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: evaluationJsonSchema,
    },
  });

  return response.text ?? "";
}