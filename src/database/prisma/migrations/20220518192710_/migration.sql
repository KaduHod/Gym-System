/*
  Warnings:

  - You are about to drop the column `email` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `nome` to the `TipoExercicio` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Aluno_email_key";

-- DropIndex
DROP INDEX "Professor_email_key";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "dataNascimento",
DROP COLUMN "email";

-- AlterTable
ALTER TABLE "TipoExercicio" ADD COLUMN     "nome" CHAR(11) NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_alunoId_key" ON "Profile"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profesorId_key" ON "Profile"("profesorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
