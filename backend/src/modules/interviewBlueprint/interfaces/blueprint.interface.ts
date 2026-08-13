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

export interface BlueprintQuestion {
  id: string;
  category: string;
  question: string;
  difficulty: string;
  skillsAssessed: string[];
  expectedDuration: number;
  followUpQuestions: string[];
  evaluationCriteria: string[];
  expectedAnswerPoints: string[];
}

export interface BlueprintSection {
  title: string;
  duration: number;
  questions: BlueprintQuestion[];
}

export interface InterviewBlueprintData {
  role: string;
  title: string;
  company: string;
  sections: BlueprintSection[];
  instructions: string[];
  estimatedDuration: number;
  overallDifficulty: string;
}