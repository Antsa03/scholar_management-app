import Matiere from "../enseignement/Matiere";

export default interface Enseignant_info {
  id_utilisateur: string;
  id_enseignant: string;
  photo_profil: string;
  nom: string;
  prenoms: string;
  sexe: string;
  adresse: string;
  telephone: string;
  email: string;
  diplome: string;
  grade: string;
  matieres: Matiere[];
}
