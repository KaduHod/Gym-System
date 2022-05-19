/*
  Warnings:

  - You are about to drop the `ProfessoresAlunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessoresAlunos" DROP CONSTRAINT "ProfessoresAlunos_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessoresAlunos" DROP CONSTRAINT "ProfessoresAlunos_professorId_fkey";

-- DropTable
DROP TABLE "ProfessoresAlunos";

-- CreateTable
CREATE TABLE "_AlunoToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlunoToProfessor_AB_unique" ON "_AlunoToProfessor"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunoToProfessor_B_index" ON "_AlunoToProfessor"("B");

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlunoToProfessor" ADD CONSTRAINT "_AlunoToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
