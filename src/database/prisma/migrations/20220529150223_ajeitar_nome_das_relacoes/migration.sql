/*
  Warnings:

  - You are about to drop the `exercicio_do_treino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercicio_do_treino" DROP CONSTRAINT "exercicio_do_treino_exercicioId_fkey";

-- DropForeignKey
ALTER TABLE "exercicio_do_treino" DROP CONSTRAINT "exercicio_do_treino_treinoId_fkey";

-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "aquecimento" TEXT;

-- DropTable
DROP TABLE "exercicio_do_treino";

-- CreateTable
CREATE TABLE "Exercicio_do_treino" (
    "id" SERIAL NOT NULL,
    "exercicioId" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercicio_do_treino_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercicio_do_treino" ADD CONSTRAINT "Exercicio_do_treino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercicio_do_treino" ADD CONSTRAINT "Exercicio_do_treino_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
