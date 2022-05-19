/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_profesorId_fkey";

-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "Treino" ADD COLUMN     "dataNascimento" TIMESTAMP(3);

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");
