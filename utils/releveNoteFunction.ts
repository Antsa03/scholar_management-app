import prisma from "@/prisma/client";
import Relevee_note from "@/models/note_1/Releve_note";
import UE_note from "@/models/note_1/UE_note";
import Matiere_note from "@/models/note_1/Matiere_note";

export async function fetchNotes(
  num_matricule: string,
  id_calendrier_2: string
) {
  const allNotes: any = await prisma.$queryRaw`
        SELECT
          n.id_noter_1,
          n.id_calendrier_2,
          n.num_matricule,
          n.code_matiere,
          n.note_matiere,
          c.id_composer_1,
          c.code_matiere,
          c.id_ue,
          c.annee_universitaire_1,
          ue.designation_ue,
          ue.credit,
          cal.id_calendrier_2,
          cal.annee_universitaire_2,
          cal.semestre,
          cal.session,
          m.code_matiere,
          m.designation_matiere,
          m.coeff,
          m.v_horaire_matiere,
          m.description,
          m.id_enseignant,
          par.id_parcours,
          par.designation_parcours,
          u.nom,
          u.prenoms,
          niv.designation_niveau,
          info.groupe
        FROM
          "Noter_1" n
        INNER JOIN
          "Composer_1" c ON n.code_matiere = c.code_matiere
        INNER JOIN
          "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
        INNER JOIN
          "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
        INNER JOIN
          "Matiere" m ON n.code_matiere = m.code_matiere
        INNER JOIN
          "Etudiant" e ON n.num_matricule = e.num_matricule
        INNER JOIN
          "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
        INNER JOIN
          "Information" info ON n.num_matricule = info.num_matricule
        INNER JOIN
          "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
        INNER JOIN
          "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
        INNER JOIN
          "Parcours" par ON comp_3.id_parcours = par.id_parcours
        WHERE
          n.num_matricule = ${num_matricule} AND n.id_calendrier_2 = ${id_calendrier_2}
        ORDER BY c.id_ue, n.code_matiere ASC
    `;
  return allNotes;
}

export async function fetchAllNote2(id_calendrier_2: string) {
  const allNotes: any = await prisma.$queryRaw`
   SELECT
        u.nom,
        u.prenoms,
        cal.id_calendrier_2,
        cal.annee_universitaire_2,
        n.num_matricule,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe,
        JSON_AGG(
          JSON_BUILD_OBJECT(
                'id_ue', ue.id_ue,
                'designation_ue', ue.designation_ue,
                'credit', ue.credit,
                'semestre_ue', ue.semestre_ue,
                'matieres', (
                    SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'code_matiere', note.code_matiere,
                            'designation_matiere', m.designation_matiere,
                            'v_horaire_matiere', m.v_horaire_matiere,
                            'coeff', m.coeff,
                            'note_matiere', note.note_matiere
                        )
                    )
                    FROM "Noter_1" note
                    INNER JOIN "Composer_1" c ON note.code_matiere = c.code_matiere
                    INNER JOIN "Matiere" m ON note.code_matiere = m.code_matiere AND c.code_matiere = m.code_matiere
                    INNER JOIN "Calendrier_2" cal ON note.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
                    INNER JOIN "Etudiant" e ON note.num_matricule = e.num_matricule
                    INNER JOIN "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
                    INNER JOIN "Information" info ON note.num_matricule = info.num_matricule
                    INNER JOIN "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
                    INNER JOIN "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
                    INNER JOIN "Parcours" par ON comp_3.id_parcours = par.id_parcours
                    INNER JOIN "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
                    WHERE c.id_ue = ue.id_ue AND note.num_matricule = n.num_matricule
                )
            )
            ORDER BY ue.id_ue
        ) AS unite_enseignements
    FROM
        "Noter_1" n
    INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
    INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
    INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
    INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
    INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
    INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
    INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
    INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
    INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
    INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
    INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
    WHERE cal.id_calendrier_2 = ${id_calendrier_2}
    GROUP BY
        u.nom,
        u.prenoms,
        n.num_matricule,
        cal.id_calendrier_2,
        cal.semestre,
        cal.session,
        cal.annee_universitaire_2,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe;
  `;

  const result: any = allNotes.map((releve_note: any) => {
    let moy_ue = 0;
    let somme_coeff_ue = 0;
    let matiere_rattr: string[] = [];
    let somme_coeff = 0;
    let somme_note_ponderee = 0;
    let somme_heure_ue = 0;
    return {
      ...releve_note,
      unite_enseignements: releve_note.unite_enseignements
        .filter((ue: any, index: number, self: any[]) => {
          // Vérifier si l'élément actuel a déjà été ajouté à la liste des résultats
          const isDuplicate =
            self.findIndex((item: any) => item.id_ue === ue.id_ue) !== index;
          // Retourner true si l'élément est unique, false sinon
          return !isDuplicate;
        })
        .map((ue: any) => {
          somme_coeff_ue = 0;
          moy_ue = 0;
          somme_heure_ue = 0;
          somme_coeff += parseFloat(ue.credit);
          ue.matieres.map((matiere: any) => {
            somme_note_ponderee +=
              Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_coeff_ue += Number(matiere.coeff);
            moy_ue += Number(matiere.coeff) * Number(matiere.note_matiere);
            if (Number(matiere.note_matiere) < 10)
              matiere_rattr.push(matiere.code_matiere);
            somme_heure_ue += parseInt(matiere.v_horaire_matiere);
          });
          return {
            id_ue: ue.id_ue,
            designation_ue: ue.designation_ue,
            credit: ue.credit,
            semestre_ue: ue.semestre_ue,
            v_horaire_ue: somme_heure_ue,
            moy_ue: (moy_ue / somme_coeff_ue).toFixed(2),
            matieres: ue.matieres.map((matiere: any) => {
              return {
                code_matiere: matiere.code_matiere,
                designation_matiere: matiere.designation_matiere,
                v_horaire_matiere: matiere.v_horaire_matiere,
                coeff: Number(matiere.coeff).toFixed(2),
                note_matiere: Number(matiere.note_matiere).toFixed(2),
              };
            }),
          };
        }),
      matiere_rattr: matiere_rattr,
      moy_semestre: somme_note_ponderee / somme_coeff,
    };
  });
  return result;
}

export async function calculateSumCoeff(
  num_matricule: string,
  id_calendrier_2: string
) {
  // Calcul de la somme des coefficients
  const sommeCoeffSql: any = await prisma.$queryRaw`
      SELECT SUM(m.coeff)
      FROM
        "Noter_1" n
      INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
      INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
      INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
      INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
      INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
      INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
      INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
      INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
      INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
      INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
      INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
      WHERE
        n.num_matricule = ${num_matricule} AND n.id_calendrier_2 = ${id_calendrier_2}

    `;

  const sommeCoeff = parseFloat(sommeCoeffSql[0].sum);
  return sommeCoeff;
}

export async function calculateSumNotePonderee(
  num_matricule: string,
  id_calendrier_2: string
) {
  // Calcul de la somme des notes pondérées
  const sommeNotePondereeSql: any = await prisma.$queryRaw`
      SELECT SUM(m.coeff * n.note_matiere)
      FROM
        "Noter_1" n
      INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
      INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
      INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
      INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
      INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
      INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
      INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
      INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
      INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
      INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
      INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
      WHERE
        n.num_matricule = ${num_matricule} AND n.id_calendrier_2 = ${id_calendrier_2}
    `;
  const sommeNotePonderee = parseFloat(sommeNotePondereeSql[0].sum);
  return sommeNotePonderee;
}

export async function calculateValues(
  allNotes: any,
  somme_coeff: number,
  somme_note_ponderee: number
) {
  // Regrouper les matières par unité d'enseignement
  const groupedNotes = allNotes.reduce((acc: any, note: any) => {
    const ueId = note.id_ue;
    if (!acc[ueId]) {
      acc[ueId] = {
        id_ue: ueId,
        designation_ue: note.designation_ue,
        credit: note.credit,
        matieres: [],
      };
    }
    acc[ueId].matieres.push({
      code_matiere: note.code_matiere,
      designation_matiere: note.designation_matiere,
      coeff: Math.round(note.coeff * 100) / 100,
      v_horaire_matiere: note.v_horaire_matiere,
      description: note.description,
      id_enseignant: note.id_enseignant,
      note_matiere: note.note_matiere,
    });
    return acc;
  }, {});

  // Convertir l'objet regroupé en tableau
  const groupedNotesArray = Object.values(groupedNotes);

  const result: Relevee_note = {
    nom: allNotes[0].nom,
    prenoms: allNotes[0].prenoms,
    semestre: allNotes[0].semestre,
    session: allNotes[0].session,
    annee_universitaire: allNotes[0].annee_universitaire_2,
    id_parcours: allNotes[0].id_parcours,
    designation_parcours: allNotes[0].designation_parcours,
    num_matricule: allNotes[0].num_matricule,
    niveau: allNotes[0].designation_niveau,
    groupe: allNotes[0].groupe,
    notes: groupedNotesArray.map((ue: any) => {
      return {
        id_ue: ue.id_ue,
        designation_ue: ue.designation_ue,
        credit: ue.credit,
        matieres: ue.matieres.map((matiere: Matiere_note) => {
          return {
            code_matiere: matiere.code_matiere,
            designation_matiere: matiere.designation_matiere,
            coeff: Number(matiere.coeff).toFixed(2).replace(".", ","),
            note_matiere: Number(matiere.note_matiere)
              .toFixed(2)
              .replace(".", ","),
          };
        }),
      };
    }),
    somme_coeff: somme_coeff,
    moy_gen: (somme_note_ponderee / somme_coeff).toFixed(2).replace(".", ","),
  };
  return result;
}

export async function fetchAllNote3(
  id_calendrier_2: string,
  num_matricule: string
) {
  const allNotes: any = await prisma.$queryRaw`
   SELECT
        u.nom,
        u.prenoms,
        cal.id_calendrier_2,
        cal.annee_universitaire_2,
        n.num_matricule,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe,
        JSON_AGG(
          JSON_BUILD_OBJECT(
                'id_ue', ue.id_ue,
                'designation_ue', ue.designation_ue,
                'credit', ue.credit,
                'semestre_ue', ue.semestre_ue,
                'matieres', (
                    SELECT JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'code_matiere', note.code_matiere,
                            'designation_matiere', m.designation_matiere,
                            'v_horaire_matiere', m.v_horaire_matiere,
                            'coeff', m.coeff,
                            'note_matiere', note.note_matiere
                        )
                    )
                    FROM "Noter_1" note
                    INNER JOIN "Composer_1" c ON note.code_matiere = c.code_matiere
                    INNER JOIN "Matiere" m ON note.code_matiere = m.code_matiere AND c.code_matiere = m.code_matiere
                    INNER JOIN "Calendrier_2" cal ON note.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
                    INNER JOIN "Etudiant" e ON note.num_matricule = e.num_matricule
                    INNER JOIN "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
                    INNER JOIN "Information" info ON note.num_matricule = info.num_matricule
                    INNER JOIN "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
                    INNER JOIN "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
                    INNER JOIN "Parcours" par ON comp_3.id_parcours = par.id_parcours
                    INNER JOIN "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
                    WHERE c.id_ue = ue.id_ue AND note.num_matricule = n.num_matricule
                )
            )
            ORDER BY ue.id_ue
        ) AS unite_enseignements
    FROM
        "Noter_1" n
    INNER JOIN
        "Composer_1" c ON n.code_matiere = c.code_matiere
    INNER JOIN
        "Unite_Enseignement" ue ON c.id_ue = ue.id_ue
    INNER JOIN
        "Calendrier_2" cal ON n.id_calendrier_2 = cal.id_calendrier_2 AND cal.semestre = ue.semestre_ue
    INNER JOIN
        "Matiere" m ON n.code_matiere = m.code_matiere
    INNER JOIN
        "Etudiant" e ON n.num_matricule = e.num_matricule
    INNER JOIN
        "Utilisateur" u ON e.id_utilisateur = u.id_utilisateur
    INNER JOIN
        "Information" info ON n.num_matricule = info.num_matricule
    INNER JOIN
        "Niveau" niv ON info.id_niveau = niv.id_niveau AND info.annee_universitaire_5 = cal.annee_universitaire_2
    INNER JOIN
        "Composer_3" comp_3 ON niv.id_niveau = comp_3.id_niveau
    INNER JOIN
        "Parcours" par ON comp_3.id_parcours = par.id_parcours
    INNER JOIN 
        "Composer_2" comp_2 ON comp_2.id_parcours = par.id_parcours AND comp_2.id_ue = ue.id_ue
    WHERE cal.id_calendrier_2 = ${id_calendrier_2} AND n.num_matricule = ${num_matricule}
    GROUP BY
        u.nom,
        u.prenoms,
        n.num_matricule,
        cal.id_calendrier_2,
        cal.semestre,
        cal.session,
        cal.annee_universitaire_2,
        niv.id_niveau,
        niv.designation_niveau,
        par.id_parcours,
        par.designation_parcours,
        info.groupe;
  `;

  const result: any = allNotes.map((releve_note: any) => {
    let moy_ue = 0;
    let somme_coeff_ue = 0;
    let somme_coeff = 0;
    let somme_note_ponderee = 0;
    let somme_heure_ue = 0;
    return {
      ...releve_note,
      unite_enseignements: releve_note.unite_enseignements
        .filter((ue: any, index: number, self: any[]) => {
          // Vérifier si l'élément actuel a déjà été ajouté à la liste des résultats
          const isDuplicate =
            self.findIndex((item: any) => item.id_ue === ue.id_ue) !== index;
          // Retourner true si l'élément est unique, false sinon
          return !isDuplicate;
        })
        .map((ue: any) => {
          somme_coeff_ue = 0;
          moy_ue = 0;
          somme_heure_ue = 0;
          somme_coeff += parseFloat(ue.credit);
          ue.matieres.map((matiere: any) => {
            somme_note_ponderee +=
              Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_coeff_ue += Number(matiere.coeff);
            moy_ue += Number(matiere.coeff) * Number(matiere.note_matiere);
            somme_heure_ue += parseInt(matiere.v_horaire_matiere);
          });
          return {
            id_ue: ue.id_ue,
            designation_ue: ue.designation_ue,
            credit: ue.credit,
            semestre_ue: ue.semestre_ue,
            v_horaire_ue: somme_heure_ue,
            moy_ue: (moy_ue / somme_coeff_ue).toFixed(2),
            matieres: ue.matieres.map((matiere: any) => {
              return {
                code_matiere: matiere.code_matiere,
                designation_matiere: matiere.designation_matiere,
                v_horaire_matiere: matiere.v_horaire_matiere,
                coeff: Number(matiere.coeff).toFixed(2),
                note_matiere: Number(matiere.note_matiere).toFixed(2),
              };
            }),
          };
        }),
      somme_coeff: somme_coeff,
      moy_gen: somme_note_ponderee / somme_coeff,
    };
  });
  return result;
}
