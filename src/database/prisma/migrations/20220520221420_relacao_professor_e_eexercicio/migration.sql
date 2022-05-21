/*
  Warnings:

  - Added the required column `criadorId` to the `Exercicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercicio" ADD COLUMN     "criadorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
