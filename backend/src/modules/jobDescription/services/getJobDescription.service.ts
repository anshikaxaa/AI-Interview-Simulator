import prisma from "../../../shared/db/prisma";
import { AppError } from "../../../shared/errors/AppError";

export class GetJobDescriptionService {
  async execute(userId: string, jobDescriptionId: string) {
    const jobDescription = await prisma.jobDescription.findFirst({
      where: {
        id: jobDescriptionId,
        userId,
      },
    });

    if (!jobDescription) {
      throw new AppError(
        "Job description not found.",
        404
      );
    }

    return jobDescription;
  }
}

export const getJobDescriptionService =
  new GetJobDescriptionService();