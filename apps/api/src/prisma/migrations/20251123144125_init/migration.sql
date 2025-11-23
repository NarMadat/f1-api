-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "tyre" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "attendance" INTEGER NOT NULL,
    "lapLengthKm" DOUBLE PRECISION NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "driverName" TEXT NOT NULL,
    "laps" INTEGER NOT NULL,
    "raceTimeMs" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "pitstops" INTEGER NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Result_teamId_idx" ON "Result"("teamId");

-- CreateIndex
CREATE INDEX "Result_stageId_idx" ON "Result"("stageId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
