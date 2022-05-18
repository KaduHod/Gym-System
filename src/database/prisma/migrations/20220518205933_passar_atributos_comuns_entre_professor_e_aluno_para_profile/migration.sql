/*
  Warnings:

  - You are about to drop the column `cpf` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Professor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "cpf",
DROP COLUMN "dataNascimento",
DROP COLUMN "nome";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "nome",
ADD COLUMN     "creef" TEXT NOT NULL DEFAULT E'Sem Creef';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cpf" TEXT NOT NULL DEFAULT E'Sem CPF',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "nome" TEXT NOT NULL DEFAULT E'Sem Nome',
ADD COLUMN     "telefone" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;
