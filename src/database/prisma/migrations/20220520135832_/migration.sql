-- DropForeignKey
ALTER TABLE "Treino" DROP CONSTRAINT "Treino_alunoId_fkey";

-- AlterTable
ALTER TABLE "Exercicio" ADD COLUMN     "imagem" TEXT,
ALTER COLUMN "video" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Treino" ALTER COLUMN "alunoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
