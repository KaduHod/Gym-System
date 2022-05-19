/*
  Warnings:

  - You are about to drop the column `dataNascimento` on the `Aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "dataNascimento";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "dataNascimento" TIMESTAMP(3);
