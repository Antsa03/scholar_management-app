interface NavbarTopNoteData {
  route: string;
  label: string;
}

export const NavbarTopNoteDatas: NavbarTopNoteData[] = [
  {
    route: "/note/ajout",
    label: "Ajouter un note",
  },
  {
    route: "/note/calendrier_2/ajout",
    label: "Ajouter calendrier 2",
  },
  {
    route: "/note",
    label: "Liste des notes",
  },
  {
    route: "/note/calendrier_2",
    label: "Listage Calendrier 2",
  },
  {
    route: "/note/releve_note",
    label: "Liste des étudiants",
  },
];
