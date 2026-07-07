export interface CreateResumeDTO {
  title: string;
  userId: string;
  file: Express.Multer.File;
}
