export class InterviewBlueprintService {
  async createInterviewBlueprint() {
    return {
      message: "Blueprint service reached",
    };
  }
}

export const interviewBlueprintService = new InterviewBlueprintService();
