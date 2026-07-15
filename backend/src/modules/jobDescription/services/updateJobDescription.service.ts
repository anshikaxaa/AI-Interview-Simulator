import prisma from "../../../shared/db/prisma";
import { AppError } from "../../../shared/errors/AppError";

import { UpdateJobDescriptionDTO } from "../types/jobDescription.types";

export class UpdateJobDescriptionService {
  async execute(
    userId: string,
    jobDescriptionId: string,
    data: UpdateJobDescriptionDTO
  ) {
    const jobDescription =
      await prisma.jobDescription.findFirst({
        where: {
          id: jobDescriptionId,
          userId,
        },
        select: {
          id: true,
        },
      });

    if (!jobDescription) {
      throw new AppError(
        "Job description not found.",
        404
      );
    }

    return prisma.jobDescription.update({
      where: {
        id: jobDescriptionId,
      },
      data,
      select: {
        id: true,
        title: true,
        companyName: true,
        originalFileName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export const updateJobDescriptionService =
  new UpdateJobDescriptionService();