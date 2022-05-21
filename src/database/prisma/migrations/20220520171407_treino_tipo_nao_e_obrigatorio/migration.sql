/*
  Warnings:

  - You are about to drop the column `dataNascimento` on the `Treino` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercicio" ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Treino" DROP COLUMN "dataNascimento",
ADD COLUMN     "descricao" TEXT;
