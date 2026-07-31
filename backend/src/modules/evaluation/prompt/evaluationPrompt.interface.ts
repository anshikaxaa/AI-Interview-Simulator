export interface InterviewQuestionResponse {
  question: string;
  answer: string;
}

export interface EvaluationPromptContext {
  resumeText: string;
  jobDescriptionText: string;
  responses: InterviewQuestionResponse[];
}