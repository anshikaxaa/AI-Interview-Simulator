-- CreateEnum
CREATE TYPE "BlueprintFailureCode" AS ENUM ('AI_PROVIDER_ERROR', 'AI_TIMEOUT', 'AI_RATE_LIMITED', 'EMPTY_AI_RESPONSE', 'INVALID_AI_OUTPUT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "InterviewSessionStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- AlterTable
ALTER TABLE "InterviewBlueprint" ADD COLUMN     "failureCode" "BlueprintFailureCode",
ADD COLUMN     "providerResponseId" TEXT;

-- AlterTable
ALTER TABLE "JobDescription" ADD COLUMN     "failureCode" "BlueprintFailureCode",
ADD COLUMN     "failureReason" TEXT;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "failureCode" "BlueprintFailureCode",
ADD COLUMN     "failureReason" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failureCode" "BlueprintFailureCode",
ADD COLUMN     "failureReason" TEXT;

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" TEXT NOT NULL,
    "status" "InterviewSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewSession_userId_idx" ON "InterviewSession"("userId");

-- CreateIndex
CREATE INDEX "InterviewSession_blueprintId_idx" ON "InterviewSession"("blueprintId");

-- CreateIndex
CREATE INDEX "InterviewSession_status_idx" ON "InterviewSession"("status");

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_blueprintId_fkey" FOREIGN KEY ("blueprintId") REFERENCES "InterviewBlueprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
