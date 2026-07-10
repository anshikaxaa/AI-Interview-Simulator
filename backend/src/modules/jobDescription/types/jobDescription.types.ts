import { Express } from "express";

export interface CreateJobDescriptionDTO {
  title: string;
  companyName?: string;
  userId: string;
  file: Express.Multer.File;
}