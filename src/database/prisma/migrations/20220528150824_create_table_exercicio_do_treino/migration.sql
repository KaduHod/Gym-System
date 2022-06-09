/*
  Warnings:

  - You are about to drop the `_ExercicioToTreino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExercicioToTreino" DROP CONSTRAINT "_ExercicioToTreino_B_fkey";

-- DropTable
DROP TABLE "_ExercicioToTreino";

-- CreateTable
CREATE TABLE "exercicio_do_treino" (
    "id" SERIAL NOT NULL,
    "exercicioId" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "treinoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercicio_do_treino_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercicio_do_treino" ADD CONSTRAINT "exercicio_do_treino_treinoId_fkey" FOREIGN KEY ("treinoId") REFERENCES "Treino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercicio_do_treino" ADD CONSTRAINT "exercicio_do_treino_exercicioId_fkey" FOREIGN KEY ("exercicioId") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
