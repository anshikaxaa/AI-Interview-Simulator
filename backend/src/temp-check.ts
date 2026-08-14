import prisma from "./shared/db/prisma";

async function main() {
  const session = await prisma.interviewSession.findUnique({
    where: {
      id: "cmrx79biy0001u12ggrjx9nka",
    },
    select: {
      id: true,
      status: true,
      currentQuestionIndex: true,
      completedAt: true,

      answers: {
        orderBy: {
          questionIndex: "asc",
        },
        select: {
          questionIndex: true,
          answerText: true,
        },
      },

      blueprint: {
        select: {
          id: true,
          blueprintData: true,
        },
      },
    },
  });

  console.log(JSON.stringify(session, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });