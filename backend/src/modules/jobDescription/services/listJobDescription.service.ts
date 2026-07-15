import prisma from "../../../shared/db/prisma";

export class ListJobDescriptionsService {
  async execute(userId: string) {
    return prisma.jobDescription.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
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

export const listJobDescriptionsService =
  new ListJobDescriptionsService();