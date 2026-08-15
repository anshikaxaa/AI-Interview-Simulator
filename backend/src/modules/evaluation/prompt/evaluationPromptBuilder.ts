import { EvaluationPromptContext } from "./evaluationPrompt.interface";

export function buildEvaluationPrompt(
  context: EvaluationPromptContext
): string {
  return `
${buildRoleSection()}

${buildEvaluationCriteriaSection()}

${buildScoringRulesSection()}

${buildInputSection(context)}

${buildOutputSection()}
`.trim();
}

  function buildRoleSection(): string {
  return `
You are a senior software engineer and experienced technical interviewer.

Your responsibility is to objectively evaluate a candidate's interview performance based on:

- Resume
- Job Description
- Interview Questions
- Candidate Answers

Provide fair, constructive, and professional feedback.
`.trim();
}

  function buildEvaluationCriteriaSection(): string {
  return `
Evaluate the candidate in the following categories:

1. Technical Knowledge
- Correctness
- Depth of understanding
- Use of appropriate technical concepts

2. Communication
- Clarity
- Structure
- Technical explanation
- Confidence of expression

3. Problem Solving
- Logical reasoning
- Approach to solving problems
- Ability to explain trade-offs
`.trim();
}

    function buildScoringRulesSection(): string {
  return `
Scoring Guidelines (0-100):

90-100:
Exceptional performance with strong technical understanding, excellent communication, and outstanding problem-solving skills.

75-89:
Good performance with solid technical knowledge and clear communication. Minor improvements may be needed.

60-74:
Average performance demonstrating basic understanding but with noticeable gaps in technical depth, communication, or reasoning.

40-59:
Below average performance with significant weaknesses in multiple areas.

0-39:
Poor performance showing insufficient understanding, weak communication, or inability to solve the problems effectively.

Use the full scoring range whenever appropriate. Do not avoid high or low scores if they are justified.
`.trim();
}


  function buildInputSection(
  context: EvaluationPromptContext
): string {
  const formattedResponses = context.responses
    .map(
      (response, index) => `
Question ${index + 1}:
${response.question}

Answer:
${response.answer}
`.trim()
    )
    .join("\n\n");

  return `
Resume:
${context.resumeText}

Job Description:
${context.jobDescriptionText}

Interview Responses:

${formattedResponses}
`.trim();
}


function buildOutputSection(): string {
  return `
Return ONLY valid JSON.

Do not include Markdown.
Do not wrap the response in triple backticks.
Do not include explanations before or after the JSON.

The response must exactly match the following structure:

{
  "overall": {
    "score": 0,
    "summary": ""
  },
  "categoryScores": {
    "technicalKnowledge": 0,
    "communication": 0,
    "problemSolving": 0
  },
  "assessment": {
    "assessment": "GOOD",
    "reason": ""
  },
  "strengths": [
    ""
  ],
  "areasForImprovement": [
    ""
  ],
  "recommendations": [
    ""
  ],
  "questionFeedback": [
    {
      "questionIndex": 0,
      "score": 0,
      "feedback": ""
    }
  ]
}

Requirements:
- All scores must be numbers between 0 and 100.
- Return at least one strength.
- Return at least one area for improvement.
- Return at least one recommendation.
- Include feedback for every interview question.
- questionIndex must be zero-based.
- The first interview question has questionIndex 0.
- The second interview question has questionIndex 1.
- Continue this pattern for all interview questions.
- Return exactly one questionFeedback object for each interview question.
- The assessment field must be one of the following values: 
  - "EXCELLENT"
  - "GOOD"
  - "BORDERLINE"
  - "NEEDS_IMPROVEMENT"
- NEVER use "ABOVE AVERAGE", "WEAK", "EXCELLENT" or "BELOW AVERAGE" in the assessment field.
`.trim();
}