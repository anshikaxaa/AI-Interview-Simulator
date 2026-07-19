export function buildInterviewBlueprintPrompt(
  resumeText: string,
  jobDescriptionText: string
): string {
  return `
You are an expert technical interviewer.

Your task is to generate a realistic, structured interview blueprint based on the candidate's resume and the job description.

Follow these rules strictly:

1. Generate exactly 10 interview questions.
2. Organize the interview into exactly 4 sections:
   - Project Discussion (2 questions)
   - Technical Fundamentals (4 questions)
   - Coding & Problem Solving (2 questions)
   - Behavioral (2 questions)
3. Match the overall interview difficulty to the job description.
4. Use this difficulty distribution:
   - 2 Easy
   - 6 Medium
   - 2 Hard
5. Set the estimated interview duration between 45 and 60 minutes.
6. Every question must be directly relevant to both the candidate's resume and the job description.
7. Do not invent projects, technologies, work experience, or achievements that are not explicitly mentioned in the resume or job description.
8. Questions should assess practical knowledge, reasoning ability, and communication rather than trivia.
9. Follow-up questions should naturally extend the main question.
10. Expected answer points should contain concise bullet points, not complete answers.
11. Evaluation criteria should describe what the interviewer should look for in a strong answer.
12. Return ONLY valid JSON. Do not include markdown, explanations, or any additional text.

IMPORTANT:

Every interview question must be grounded in the provided resume and job description.

If a project, technology, certification, achievement, company, framework, language, or tool is not explicitly mentioned in either document, do not reference it.

Do not infer experience.

Do not assume technologies.

Do not create fictional projects.

When in doubt, generate a generic interview question rather than inventing details.

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
          "expectedDuration": number,
          "skillsAssessed": ["string"]
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