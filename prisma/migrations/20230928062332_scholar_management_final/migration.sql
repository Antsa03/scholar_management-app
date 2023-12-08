/*
  Warnings:

  - You are about to drop the `Inscrir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inscrir" DROP CONSTRAINT "Inscrir_num_matricule_fkey";

-- DropTable
DROP TABLE "Inscrir";

-- CreateTable
CREATE TABLE "Inscrire" (
    "id_inscription" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,

    CONSTRAINT "Inscrire_pkey" PRIMARY KEY ("id_inscription","num_matricule","id_niveau")
);

-- AddForeignKey
ALTER TABLE "Inscrire" ADD CONSTRAINT "Inscrire_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscrire" ADD CONSTRAINT "Inscrire_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE CASCADE ON UPDATE CASCADE;
