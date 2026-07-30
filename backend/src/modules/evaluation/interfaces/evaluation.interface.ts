export type Assessment =
  | "STRONG"
  | "GOOD"
  | "BORDERLINE"
  | "NEEDS_IMPROVEMENT";

export interface EvaluationOverall {
  score: number;
  summary: string;
}

export interface EvaluationCategoryScores {
  technicalKnowledge: number;
  communication: number;
  problemSolving: number;
}

export interface EvaluationAssessment {
  assessment: Assessment;
  reason: string;
}

export interface QuestionFeedback {
  questionIndex: number;
  score: number;
  feedback: string;
}

export interface EvaluationResult {
  overall: EvaluationOverall;
  categoryScores: EvaluationCategoryScores;
  assessment: EvaluationAssessment;
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
  questionFeedback: QuestionFeedback[];
}