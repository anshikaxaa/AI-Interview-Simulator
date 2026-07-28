export interface BlueprintQuestion {
  id: string;
  question: string;
}

export interface BlueprintSection {
  title: string;
  duration: number;
  questions: BlueprintQuestion[];
}

export interface BlueprintData {
  role: string;
  title: string;
  company: string;
  sections: BlueprintSection[];
}