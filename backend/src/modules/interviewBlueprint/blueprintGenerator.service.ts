import { gemini } from "./interviewBlueprint.ai";
import { buildInterviewBlueprintPrompt } from "./interviewBlueprint.prompt";
import { InterviewBlueprintData } from "./interviewBlueprint.types";
import { interviewBlueprintResponseSchema } from "./interviewBlueprintResponse.schema";

export class BlueprintGeneratorService {
 async generateInterviewBlueprint(
  resumeText: string,
  jobDescriptionText: string
):  Promise<InterviewBlueprintData> {
  const prompt = buildInterviewBlueprintPrompt(
    resumeText,
    jobDescriptionText
  );

  const response = await gemini.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

const rawResponse = response.text ?? "";

const cleanedResponse = rawResponse
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/, "")
  .trim();

const parsedBlueprint = JSON.parse(cleanedResponse);

const validation =
  interviewBlueprintResponseSchema.safeParse(parsedBlueprint);

if (!validation.success) {
  console.error("Blueprint validation failed:");
  console.error(validation.error.format());

  throw new Error(
    "Gemini returned an invalid interview blueprint."
  );
}

return validation.data;
    }
}


export const blueprintGeneratorService =
  new BlueprintGeneratorService();