import { apiClient } from "./client";

export interface JobDescription {
  id: string;
  title: string;
  companyName: string | null;
  originalFileName: string;
  createdAt: string;
  updatedAt: string;
}

interface GetJobDescriptionsResponse {
  success: true;
  data: JobDescription[];
}

export async function getJobDescriptions(): Promise<GetJobDescriptionsResponse> {
  return apiClient<GetJobDescriptionsResponse>("/job-descriptions", {
    method: "GET",
    auth: true,
  });
}