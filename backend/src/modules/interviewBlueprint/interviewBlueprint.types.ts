export type CreateInterviewBlueprintInput = {
  resumeId: string;
  jobDescriptionId: string;
};

export type InterviewQuestion = {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  expectedAnswerPoints: string[];
  followUpQuestions: string[];
  evaluationCriteria: string[];
};

export type InterviewSection = {
  title: string;
  duration: number;
  questions: InterviewQuestion[];
};

export type InterviewBlueprintData = {
  title: string;
  role: string;
  company: string;
  overallDifficulty: "Easy" | "Medium" | "Hard";
  estimatedDuration: number;
  instructions: string[];
  sections: InterviewSection[];
};