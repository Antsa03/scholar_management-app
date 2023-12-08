import UE_note from "./UE_note";

export default interface Releve_note {
  nom: string;
  prenoms: string;
  semestre: string;
  session: string;
  annee_universitaire: string;
  id_parcours: string;
  designation_parcours: string;
  num_matricule: string;
  niveau: string;
  groupe: string;
  notes: UE_note[];
  somme_coeff: number;
  moy_gen: string;
}
