-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" VARCHAR(10) NOT NULL,
    "photo_profil" TEXT NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "prenoms" VARCHAR(60) NOT NULL,
    "sexe" VARCHAR(8) NOT NULL,
    "adresse" VARCHAR(40) NOT NULL,
    "telephone" VARCHAR(14) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mot_de_passe" VARCHAR(60) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" VARCHAR(10) NOT NULL,
    "fonction" VARCHAR(30) NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Responsable_legal" (
    "id_responsable_legal" VARCHAR(10) NOT NULL,
    "profession" VARCHAR(10) NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Responsable_legal_pkey" PRIMARY KEY ("id_responsable_legal")
);

-- CreateTable
CREATE TABLE "Relation" (
    "id_relation" VARCHAR(10) NOT NULL,
    "id_responsable_legal" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id_relation","id_responsable_legal","num_matricule")
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "num_matricule" VARCHAR(10) NOT NULL,
    "date_naissance" DATE NOT NULL,
    "lieu_naissance" VARCHAR(40) NOT NULL,
    "nationalite" VARCHAR(15) NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("num_matricule")
);

-- CreateTable
CREATE TABLE "Inscrir" (
    "id_inscription" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,

    CONSTRAINT "Inscrir_pkey" PRIMARY KEY ("id_inscription","num_matricule","id_niveau")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "id_enseignant" VARCHAR(10) NOT NULL,
    "diplome" VARCHAR(30) NOT NULL,
    "grade" VARCHAR(20) NOT NULL,
    "id_utilisateur" VARCHAR(10) NOT NULL,

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("id_enseignant")
);

-- CreateTable
CREATE TABLE "Soutenance" (
    "id_soutenance" VARCHAR(10) NOT NULL,
    "theme" VARCHAR(100) NOT NULL,
    "date_soutenance" DATE NOT NULL,
    "id_enseignant" VARCHAR(10) NOT NULL,

    CONSTRAINT "Soutenance_pkey" PRIMARY KEY ("id_soutenance")
);

-- CreateTable
CREATE TABLE "Noter_2" (
    "id_noter_2" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "id_soutenance" VARCHAR(10) NOT NULL,

    CONSTRAINT "Noter_2_pkey" PRIMARY KEY ("id_noter_2","num_matricule","id_soutenance")
);

-- CreateTable
CREATE TABLE "Absence_soutenance" (
    "id_absence_soutenance" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "id_soutenance" VARCHAR(10) NOT NULL,
    "justifiee_abs_soutenance" CHAR(3) NOT NULL,

    CONSTRAINT "Absence_soutenance_pkey" PRIMARY KEY ("id_absence_soutenance","num_matricule","id_soutenance")
);

-- CreateTable
CREATE TABLE "Niveau" (
    "id_niveau" VARCHAR(10) NOT NULL,
    "designation_niveau" VARCHAR(2) NOT NULL,

    CONSTRAINT "Niveau_pkey" PRIMARY KEY ("id_niveau")
);

-- CreateTable
CREATE TABLE "Parcours" (
    "id_parcours" VARCHAR(10) NOT NULL,
    "designation_parcours" VARCHAR(30) NOT NULL,

    CONSTRAINT "Parcours_pkey" PRIMARY KEY ("id_parcours")
);

-- CreateTable
CREATE TABLE "Composer_3" (
    "id_composer_3" VARCHAR(10) NOT NULL,
    "id_niveau" VARCHAR(10) NOT NULL,
    "id_parcours" VARCHAR(10) NOT NULL,

    CONSTRAINT "Composer_3_pkey" PRIMARY KEY ("id_composer_3","id_niveau","id_parcours")
);

-- CreateTable
CREATE TABLE "Unite_Enseignement" (
    "id_ue" VARCHAR(10) NOT NULL,
    "designation_ue" VARCHAR(100) NOT NULL,
    "credit" INTEGER NOT NULL,

    CONSTRAINT "Unite_Enseignement_pkey" PRIMARY KEY ("id_ue")
);

-- CreateTable
CREATE TABLE "Composer_2" (
    "id_composer_2" VARCHAR(10) NOT NULL,
    "id_parcours" VARCHAR(10) NOT NULL,
    "id_ue" VARCHAR(10) NOT NULL,

    CONSTRAINT "Composer_2_pkey" PRIMARY KEY ("id_composer_2","id_parcours","id_ue")
);

-- CreateTable
CREATE TABLE "Calendrier_1" (
    "annee_universitaire" DATE NOT NULL,

    CONSTRAINT "Calendrier_1_pkey" PRIMARY KEY ("annee_universitaire")
);

-- CreateTable
CREATE TABLE "Matiere" (
    "code_matiere" VARCHAR(10) NOT NULL,
    "designation_matiere" VARCHAR(100) NOT NULL,
    "coeff" INTEGER NOT NULL,
    "v_horaire_matiere" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "id_enseignant" VARCHAR(10) NOT NULL,

    CONSTRAINT "Matiere_pkey" PRIMARY KEY ("code_matiere")
);

-- CreateTable
CREATE TABLE "Composer_1" (
    "id_composer_1" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "annee_universitaire" VARCHAR(12) NOT NULL,

    CONSTRAINT "Composer_1_pkey" PRIMARY KEY ("id_composer_1","code_matiere","annee_universitaire")
);

-- CreateTable
CREATE TABLE "Calendrier_2" (
    "id_calendrier_2" VARCHAR(10) NOT NULL,
    "annee_universitaire" VARCHAR(12) NOT NULL,
    "semestre" VARCHAR(3) NOT NULL,
    "session" VARCHAR(2) NOT NULL,

    CONSTRAINT "Calendrier_2_pkey" PRIMARY KEY ("id_calendrier_2","annee_universitaire","semestre")
);

-- CreateTable
CREATE TABLE "Noter_1" (
    "id_noter_1" VARCHAR(10) NOT NULL,
    "id_calendrier_2" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "note_matiere" INTEGER NOT NULL,

    CONSTRAINT "Noter_1_pkey" PRIMARY KEY ("id_noter_1","id_calendrier_2","num_matricule","code_matiere")
);

-- CreateTable
CREATE TABLE "Calendrier_3" (
    "id_calendrier_3" VARCHAR(10) NOT NULL,
    "date_deb_abs" DATE NOT NULL,
    "heure_deb_abs" TIME NOT NULL,

    CONSTRAINT "Calendrier_3_pkey" PRIMARY KEY ("id_calendrier_3","date_deb_abs","heure_deb_abs")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id_absence" VARCHAR(10) NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,
    "code_matiere" VARCHAR(10) NOT NULL,
    "id_calendrier_3" VARCHAR(10) NOT NULL,
    "type_absence" VARCHAR(6) NOT NULL,
    "date_fin_abs" DATE NOT NULL,
    "heure_fin_abs" TIME NOT NULL,
    "justifiee" CHAR(3) NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id_absence","num_matricule","code_matiere","id_calendrier_3")
);

-- CreateTable
CREATE TABLE "Demande_absence" (
    "id_demande_absence" VARCHAR(10) NOT NULL,
    "motif" VARCHAR(60) NOT NULL,
    "date_demandee" DATE NOT NULL,
    "num_matricule" VARCHAR(10) NOT NULL,

    CONSTRAINT "Demande_absence_pkey" PRIMARY KEY ("id_demande_absence")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_2_id_calendrier_2_key" ON "Calendrier_2"("id_calendrier_2");

-- CreateIndex
CREATE UNIQUE INDEX "Calendrier_3_id_calendrier_3_key" ON "Calendrier_3"("id_calendrier_3");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsable_legal" ADD CONSTRAINT "Responsable_legal_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_id_responsable_legal_fkey" FOREIGN KEY ("id_responsable_legal") REFERENCES "Responsable_legal"("id_responsable_legal") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etudiant" ADD CONSTRAINT "Etudiant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscrir" ADD CONSTRAINT "Inscrir_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soutenance" ADD CONSTRAINT "Soutenance_id_enseignant_fkey" FOREIGN KEY ("id_enseignant") REFERENCES "Enseignant"("id_enseignant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_2" ADD CONSTRAINT "Noter_2_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_2" ADD CONSTRAINT "Noter_2_id_soutenance_fkey" FOREIGN KEY ("id_soutenance") REFERENCES "Soutenance"("id_soutenance") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_soutenance" ADD CONSTRAINT "Absence_soutenance_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence_soutenance" ADD CONSTRAINT "Absence_soutenance_id_soutenance_fkey" FOREIGN KEY ("id_soutenance") REFERENCES "Soutenance"("id_soutenance") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_3" ADD CONSTRAINT "Composer_3_id_niveau_fkey" FOREIGN KEY ("id_niveau") REFERENCES "Niveau"("id_niveau") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_3" ADD CONSTRAINT "Composer_3_id_parcours_fkey" FOREIGN KEY ("id_parcours") REFERENCES "Parcours"("id_parcours") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_2" ADD CONSTRAINT "Composer_2_id_parcours_fkey" FOREIGN KEY ("id_parcours") REFERENCES "Parcours"("id_parcours") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_2" ADD CONSTRAINT "Composer_2_id_ue_fkey" FOREIGN KEY ("id_ue") REFERENCES "Unite_Enseignement"("id_ue") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matiere" ADD CONSTRAINT "Matiere_id_enseignant_fkey" FOREIGN KEY ("id_enseignant") REFERENCES "Enseignant"("id_enseignant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composer_1" ADD CONSTRAINT "Composer_1_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_id_calendrier_2_fkey" FOREIGN KEY ("id_calendrier_2") REFERENCES "Calendrier_2"("id_calendrier_2") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noter_1" ADD CONSTRAINT "Noter_1_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_code_matiere_fkey" FOREIGN KEY ("code_matiere") REFERENCES "Matiere"("code_matiere") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_id_calendrier_3_fkey" FOREIGN KEY ("id_calendrier_3") REFERENCES "Calendrier_3"("id_calendrier_3") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demande_absence" ADD CONSTRAINT "Demande_absence_num_matricule_fkey" FOREIGN KEY ("num_matricule") REFERENCES "Etudiant"("num_matricule") ON DELETE CASCADE ON UPDATE CASCADE;
