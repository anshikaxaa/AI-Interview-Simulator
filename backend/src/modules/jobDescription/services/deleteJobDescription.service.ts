import fs from "fs/promises";

import prisma from "../../../shared/db/prisma";
import { AppError } from "../../../shared/errors/AppError";

export class DeleteJobDescriptionService {
  async execute(
    userId: string,
    jobDescriptionId: string
  ) {
    const jobDescription =
      await prisma.jobDescription.findFirst({
        where: {
          id: jobDescriptionId,
          userId,
        },
        select: {
          id: true,
          filePath: true,
        },
      });

    if (!jobDescription) {
      throw new AppError(
        "Job description not found.",
        404
      );
    }

    await fs.unlink(jobDescription.filePath);

    await prisma.jobDescription.delete({
      where: {
        id: jobDescription.id,
      },
    });
  }
}

export const deleteJobDescriptionService =
  new DeleteJobDescriptionService();