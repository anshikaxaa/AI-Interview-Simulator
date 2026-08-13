import prisma from "./shared/db/prisma";

async function main() {
  const blueprints = await prisma.interviewBlueprint.findMany({
    select: {
      id: true,
      blueprintData: true,
      status: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(JSON.stringify(blueprints, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });