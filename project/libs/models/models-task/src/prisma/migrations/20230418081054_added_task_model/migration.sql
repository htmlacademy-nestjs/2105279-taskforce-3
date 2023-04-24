/*
  Warnings:

  - You are about to drop the `Respond` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Respond" DROP CONSTRAINT "Respond_task_id_fkey";

-- DropTable
DROP TABLE "Respond";

-- CreateTable
CREATE TABLE "responds" (
    "respond_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "executer_id" TEXT NOT NULL,

    CONSTRAINT "responds_pkey" PRIMARY KEY ("respond_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responds_task_id_key" ON "responds"("task_id");

-- AddForeignKey
ALTER TABLE "responds" ADD CONSTRAINT "responds_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
