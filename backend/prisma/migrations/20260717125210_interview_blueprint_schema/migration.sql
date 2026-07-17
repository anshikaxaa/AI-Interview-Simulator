-- CreateEnum
CREATE TYPE "InterviewBlueprintStatus" AS ENUM ('PENDING', 'GENERATING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "InterviewBlueprint" (
    "id" TEXT NOT NULL,
    "status" "InterviewBlueprintStatus" NOT NULL DEFAULT 'PENDING',
    "blueprintData" JSONB,
    "failureReason" TEXT,
    "modelName" TEXT,
    "modelVersion" TEXT,
    "promptVersion" TEXT,
    "promptTokenCount" INTEGER,
    "outputTokenCount" INTEGER,
    "totalTokenCount" INTEGER,
    "generationStartedAt" TIMESTAMP(3),
    "generationCompletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "jobDescriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewBlueprint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewBlueprint_userId_idx" ON "InterviewBlueprint"("userId");

-- CreateIndex
CREATE INDEX "InterviewBlueprint_resumeId_idx" ON "InterviewBlueprint"("resumeId");

-- CreateIndex
CREATE INDEX "InterviewBlueprint_jobDescriptionId_idx" ON "InterviewBlueprint"("jobDescriptionId");

-- CreateIndex
CREATE INDEX "InterviewBlueprint_userId_status_idx" ON "InterviewBlueprint"("userId", "status");

-- AddForeignKey
ALTER TABLE "InterviewBlueprint" ADD CONSTRAINT "InterviewBlueprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewBlueprint" ADD CONSTRAINT "InterviewBlueprint_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewBlueprint" ADD CONSTRAINT "InterviewBlueprint_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
