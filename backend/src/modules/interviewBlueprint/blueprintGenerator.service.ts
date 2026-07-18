import { gemini } from "./interviewBlueprint.ai";
import { buildInterviewBlueprintPrompt } from "./interviewBlueprint.prompt";

import { InterviewBlueprintData } from "./interviewBlueprint.types";

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
  });

const rawResponse = response.text ?? "";

const cleanedResponse = rawResponse
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/, "")
  .trim();

const blueprint = JSON.parse(
  cleanedResponse
) as InterviewBlueprintData;

return blueprint;
    }
}


export const blueprintGeneratorService =
  new BlueprintGeneratorService();