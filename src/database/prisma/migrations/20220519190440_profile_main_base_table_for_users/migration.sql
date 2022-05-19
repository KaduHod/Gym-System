/*
  Warnings:

  - You are about to drop the column `cpf` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Professor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "cpf",
DROP COLUMN "nome",
DROP COLUMN "telefone";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "cpf",
DROP COLUMN "dataNascimento",
DROP COLUMN "nome",
DROP COLUMN "telefone";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "telefone" TEXT;
