interface NavbarTopUtilisateurData {
  routes: string;
  label: string;
}

export const NavbarTopUtilisateurDatas: NavbarTopUtilisateurData[] = [
  {
    routes: "/utilisateur/ajout",
    label: "Ajouter utilisateur",
  },
  {
    routes: "/utilisateur/relation/ajout",
    label: "Ajouter relation",
  },
  {
    routes: "/utilisateur/admin",
    label: "Liste des administrateurs",
  },
  {
    routes: "/utilisateur/enseignant",
    label: "Liste des enseignants",
  },
  {
    routes: "/utilisateur/etudiant",
    label: "Liste des étudiants",
  },
  {
    routes: "/utilisateur/responsable_legal",
    label: "Liste des responsables légaux",
  },
  {
    routes: "/utilisateur/relation",
    label: "Listes des relations",
  },
];
