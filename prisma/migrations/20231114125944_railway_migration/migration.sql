/*
  Warnings:

  - The primary key for the `Calendrier_1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `annee_universitaire` on the `Calendrier_1` table. All the data in the column will be lost.
  - The primary key for the `Calendrier_2` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `annee_universitaire` on the `Calendrier_2` table. All the data in the column will be lost.
  - The primary key for the `Composer_1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `annee_universitaire` on the `Composer_1` table. All the data in the column will be lost.
  - The primary key for the `Demande_absence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_niveau` on the `Etudiant` table. All the data in the column will be lost.
  - The primary key for the `Matiere` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Soutenance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Inscrire` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_absence]` on the table `Absence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_absence_soutenance]` on the table `Absence_soutenance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_composer_1]` on the table `Composer_1` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_composer_2]` on the table `Composer_2` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_composer_3]` on the table `Composer_3` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_demande_absence]` on the table `Demande_absence` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code_matiere]` on the table `Matiere` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_noter_1]` on the table `Noter_1` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_noter_2]` on the table `Noter_2` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_relation]` on the table `Relation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_soutenance]` on the table `Soutenance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `justifiee` on the `Absence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `annee_universitaire_1` to the `Calendrier_1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annee_universitaire_2` to the `Calendrier_2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annee_universitaire_1` to the `Composer_1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_ue` to the `Composer_1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre_ue` to the `Unite_Enseignement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inscrire" DROP CONSTRAINT "Inscrire_id_niveau_fkey";

-- DropForeignKey
ALTER TABLE "Inscrire" DROP CONSTRAINT "Inscrire_num_matricule_fkey";

-- AlterTable
ALTER TABLE "Absence" DROP COLUMN "justifiee",
ADD COLUMN     "justifiee" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Calendrier_1" DROP CONSTRAINT "Calendrier_1_pkey",
DROP COLUMN "annee_universitaire",
ADD COLUMN     "annee_universitaire_1" VARCHAR(12) NOT NULL,
ADD CONSTRAINT "Calendrier_1_pkey" PRIMARY KEY ("annee_universitaire_1");

-- AlterTable
ALTER TABLE "Calendrier_2" DROP CONSTRAINT "Calendrier_2_pkey",
DROP COLUMN "annee_universitaire",
ADD COLUMN     "annee_universitaire_2" VARCHAR(12) NOT NULL,
ADD CONSTRAINT "Calendrier_2_pkey" PRIMARY KEY ("id_calendrier_2", "annee_universitaire_2", "semestre");

-- AlterTable
ALTER TABLE "Composer_1" DROP CONSTRAINT "Composer_1_pkey",
DROP COLUMN "annee_universitaire",
ADD COLUMN     "annee_universitaire_1" VARCHAR(12) NOT NULL,
ADD COLUMN     "id_ue" VARCHAR(10) NOT NULL,
ADD CONSTRAINT "Composer_1_pkey" PRIMARY KEY ("id_composer_1", "code_matiere", "annee_universitaire_1");

-- AlterTable
ALTER TABLE "Demande_absence" DROP CONSTRAINT "Demande_absence_pkey",
ADD CONSTRAINT "Demande_absence_pkey" PRIMARY KEY ("id_demande_absence", "num_matricule");

-- AlterTable
ALTER TABLE "Enseignant" ALTER COLUMN "grade" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Etudiant" DROP COLUMN "id_niveau";

-- AlterTable
ALTER TABLE "Matiere" DROP CONSTRAINT "Matiere_pkey",
ALTER COLUMN "designation_matiere" SET DATA TYPE TEXT,
ALTER COLUMN "coeff" SET DATA TYPE REAL,
ADD CONSTRAINT "Matiere_pkey" PRIMARY KEY ("code_matiere", "id_enseignant");

-- AlterTable
ALTER TABLE "Noter_1" ALTER COLUMN "note_matiere" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "Responsable_legal" ALTER COLUMN "profession" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Soutenance" DROP CONSTRAINT "Soutenance_pkey",
ADD CONSTRAINT "Soutenance_pkey" PRIMARY KEY ("id_soutenance", "id_enseignant");

-- AlterTable
ALTER TABLE "Unite_Enseignement" ADD COLUMN     "semestre_ue" VARCHAR(3) NOT NULL;

-- DropTable
DROP TABLE "Inscrire";

-- CreateTable
CREATE TABLE "Calendrier_4" (
    "id_calendrier_4" VARCHAR(10) NOT NULL,
    "date_deb_abs_ens" DATE NOT NULL,
    "heure_deb_abs_ens" TIME NOT NULL,

    CONSTRAINT "Calendrier_4_pkey" PRIMARY KEY ("id_calendrier_4","date_deb_abs_ens","heure_deb_abs_ens")
);

-- CreateTable
CREATE TABLE "Absence_enseignant" (
    "id_absence_ens" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "id_calendrier_4" VARCHAR(10) NOT NULL,
    "date_fin_abs_ens" DATE NOT NULL,
    "heure_fin_abs_ens" TIME NOT NULL,
    "justifiee_ens" BOOLEAN NOT NULL,

    CONSTRAINT "Absence_enseignant_pkey" PRIMARY KEY ("id_absence_ens","code_matiere","id_calendrier_4")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id_obs" VARCHAR(10) NOT NULL,
    "admis" BOOLEAN NOT NULL,
    "situation" TEXT NOT NULL,
    "date_insc" DATE NOT NULL,
    "date_arret" DATE NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id_obs")
);

-- CreateTable
CREATE TABLE "Calendrier_5" (
    "annee_universitaire_5" VARCHAR(12) NOT NULL,

    CONSTRAINT "Calendrier_5_pkey" PRIMARY KEY ("annee_universitaire_5")
);

-- CreateTable
CREATE TABLE "Information" (
    "id_information" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "annee_universitaire_5" VARCHAR(12) NOT NULL,
    "id_obs" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,
    "groupe" VARCHAR(5) NOT NULL,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id_information","num_matricule","annee_universitaire_5","id_obs","id_niveau")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_4_id_calendrier_4_key" ON "Calendrier_4"("id_calendrier_4");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_enseignant_id_absence_ens_key" ON "Absence_enseignant"("id_absence_ens");

-- CreateIndex
CREATE UNIQUE INDEX "Information_id_information_key" ON "Information"("id_information");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_id_absence_key" ON "Absence"("id_absence");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_soutenance_id_absence_soutenance_key" ON "Absence_soutenance"("id_absence_soutenance");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_1_id_composer_1_key" ON "Composer_1"("id_composer_1");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_2_id_composer_2_key" ON "Composer_2"("id_composer_2");

-- CreateIndex
CREATE UNIQUE INDEX "Composer_3_id_composer_3_key" ON "Composer_3"("id_composer_3");

-- CreateIndex
CREATE UNIQUE INDEX "Demande_absence_id_demande_absence_key" ON "Demande_absence"("id_demande_absence");

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_matiere_key" ON "Matiere"("code_matiere");

-- CreateIndex
CREATE UNIQUE INDEX "Noter_1_id_noter_1_key" ON "Noter_1"("id_noter_1");

-- CreateIndex
CREATE UNIQUE INDEX "Noter_2_id_noter_2_key" ON "Noter_2"("id_noter_2");

-- CreateIndex
CREATE UNIQUE INDEX "Relation_id_relation_key" ON "Relation"("id_relation");

-- CreateIndex
CREATE UNIQUE INDEX "Soutenance_id_soutenance_key" ON "Soutenance"("id_soutenance");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_id_ue_fkey" FOREIGN KEY ("id_ue") REFERENCES "Unite_Enseignement"("id_ue") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_annee_universitaire_1_fkey" FOREIGN KEY ("annee_universitaire_1") REFERENCES "Calendrier_1"("annee_universitaire_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_enseignant" ADD CONSTRAINT "Absence_enseignant_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_enseignant" ADD CONSTRAINT "Absence_enseignant_id_calendrier_4_fkey" FOREIGN KEY ("id_calendrier_4") REFERENCES "Calendrier_4"("id_calendrier_4") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_annee_universitaire_5_fkey" FOREIGN KEY ("annee_universitaire_5") REFERENCES "Calendrier_5"("annee_universitaire_5") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_id_obs_fkey" FOREIGN KEY ("id_obs") REFERENCES "Observation"("id_obs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE CASCADE ON UPDATE CASCADE;
