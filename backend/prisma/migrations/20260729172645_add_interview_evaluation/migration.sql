-- CreateTable
CREATE TABLE "InterviewEvaluation" (
    "id" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "feedback" JSONB NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewEvaluation_sessionId_key" ON "InterviewEvaluation"("sessionId");

-- AddForeignKey
ALTER TABLE "InterviewEvaluation" ADD CONSTRAINT "InterviewEvaluation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InterviewSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
