-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_profesorId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "alunoId" DROP NOT NULL,
ALTER COLUMN "profesorId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
