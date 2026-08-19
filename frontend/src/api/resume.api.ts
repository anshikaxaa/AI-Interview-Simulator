import { apiClient } from "./client";

export interface Resume {
  id: string;
  title: string;
  originalFileName: string;
  createdAt: string;
  updatedAt: string;
}

interface GetResumesResponse {
  success: true;
  data: Resume[];
}

export async function getResumes(): Promise<GetResumesResponse> {
  return apiClient<GetResumesResponse>("/resumes", {
    method: "GET",
    auth: true,
  });
}