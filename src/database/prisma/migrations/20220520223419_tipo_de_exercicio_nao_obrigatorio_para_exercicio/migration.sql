-- DropForeignKey
ALTER TABLE "Exercicio" DROP CONSTRAINT "Exercicio_tipoId_fkey";

-- AlterTable
ALTER TABLE "Exercicio" ALTER COLUMN "tipoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoExercicio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
