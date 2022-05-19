/*
  Warnings:

  - You are about to drop the column `professorId` on the `Aluno` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_professorId_fkey";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "professorId";

-- CreateTable
CREATE TABLE "ProfessoresAlunos" (
    "alunoId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfessoresAlunos_pkey" PRIMARY KEY ("alunoId","professorId")
);

-- AddForeignKey
ALTER TABLE "ProfessoresAlunos" ADD CONSTRAINT "ProfessoresAlunos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessoresAlunos" ADD CONSTRAINT "ProfessoresAlunos_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
