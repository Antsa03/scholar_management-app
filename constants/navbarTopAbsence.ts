interface NavbarTopAbsenceData {
  route: string;
  label: string;
}

export const NavbarTopAbsenceDatas: NavbarTopAbsenceData[] = [
  {
    route: "/absence/etudiant/ajout",
    label: "Ajouter absence étudiant",
  },
  {
    route: "/absence/enseignant/ajout",
    label: "Ajouter absence enseignant",
  },
  {
    route: "/absence/etudiant",
    label: "Liste des absences etudiants",
  },
  {
    route: "/absence/enseignant",
    label: "Liste des  absences enseignants",
  },
];
