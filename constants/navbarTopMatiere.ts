interface NavbarTopMatiereData {
  routes: string;
  label: string;
}

export const NavbarTopMatiereDatas: NavbarTopMatiereData[] = [
  {
    routes: "/matiere/ajout",
    label: "Ajouter matière",
  },
  {
    routes: "/matiere",
    label: "Liste des matières",
  },
];
