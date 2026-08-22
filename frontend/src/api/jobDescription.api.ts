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

export async function createJobDescription(
  title: string,
  companyName: string,
  file: File,
): Promise<JobDescription> {
  const formData = new FormData();

  formData.append("title", title);

  if (companyName.trim()) {
    formData.append("companyName", companyName);
  }

  formData.append("file", file);

  const response = await apiClient<{ success: true; data: JobDescription }>(
    "/job-descriptions",
    {
      method: "POST",
      body: formData,
      auth: true,
    },
  );

  return response.data;
}

export async function deleteJobDescription(id: string): Promise<void> {
  await apiClient<{ success: true; message: string }>(
    `/job-descriptions/${id}`,
    {
      method: "DELETE",
      auth: true,
    },
  );
}