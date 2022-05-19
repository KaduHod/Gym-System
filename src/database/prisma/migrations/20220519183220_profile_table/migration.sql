-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER,
    "professorId" INTEGER,
    "type" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_alunoId_key" ON "Profile"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_professorId_key" ON "Profile"("professorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
