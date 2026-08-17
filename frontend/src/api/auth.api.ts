import { apiClient } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  profilePicture: string | null;
}

interface RegisterResponse {
  success: true;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

interface MeResponse {
  success: true;
  data: User;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(
  data: RegisterInput
): Promise<RegisterResponse> {
  return apiClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser(): Promise<MeResponse> {
  return apiClient<MeResponse>("/auth/me", {
    method: "GET",
    auth: true,
  });
}