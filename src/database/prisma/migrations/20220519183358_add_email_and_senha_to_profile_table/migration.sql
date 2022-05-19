/*
  Warnings:

  - You are about to drop the column `email` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Professor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Aluno_email_key";

-- DropIndex
DROP INDEX "Professor_email_key";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "email",
DROP COLUMN "senha";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "email",
DROP COLUMN "senha";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
