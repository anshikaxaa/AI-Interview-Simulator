export function buildInterviewBlueprintPrompt(
  resumeText: string,
  jobDescriptionText: string
): string {
  return `
You are an expert technical interviewer.

Generate a realistic interview blueprint based on the candidate's resume and the job description.

Return ONLY valid JSON.

The JSON must exactly follow this structure:

{
  "title": "string",
  "role": "string",
  "company": "string",
  "overallDifficulty": "Easy | Medium | Hard",
  "estimatedDuration": number,
  "instructions": ["string"],
  "sections": [
    {
      "title": "string",
      "duration": number,
      "questions": [
        {
          "id": "string",
          "question": "string",
          "category": "string",
          "difficulty": "Easy | Medium | Hard",
          "expectedAnswerPoints": ["string"],
          "followUpQuestions": ["string"],
          "evaluationCriteria": ["string"]
        }
      ]
    }
  ]
}

Candidate Resume:
${resumeText}

Job Description:
${jobDescriptionText}
`;
}