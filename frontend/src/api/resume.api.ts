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

export async function createResume(
  title: string,
  file: File,
): Promise<Resume> {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const response = await apiClient<{ success: true; data: Resume }>(
    "/resumes",
    {
      method: "POST",
      body: formData,
      auth: true,
    },
  );

  return response.data;
}