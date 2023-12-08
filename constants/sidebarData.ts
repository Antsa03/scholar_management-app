import {
  User,
  Book,
  Calendar,
  Code,
  Edit2,
  Settings,
  Icon,
  AlignLeft,
} from "react-feather";

export interface Sublink {
  route: string;
  label: string;
}

export interface SidebarItemLink {
  id: number;
  icon: Icon;
  label: string;
  sublink: Sublink[];
}

export const SidebarItemLinks: SidebarItemLink[] = [
  {
    id: 1,
    icon: User,
    label: "Utilisateur",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter utilisateur" },
      { route: "/utilisateur/admin", label: "Liste des administrateurs" },
      { route: "/utilisateur/enseignant", label: "Liste des enseignants" },
      { route: "/utilisateur/etudiant", label: "Liste des étudiants" },
      {
        route: "/utilisateur/responsable_legal",
        label: "Liste des responsables légales",
      },
      {
        route: "/utilisateur/relation",
        label: "Liste des relations",
      },
    ],
  },

  {
    id: 4,
    icon: Book,
    label: "Soutenance",
    sublink: [],
  },
  {
    id: 5,
    icon: Book,
    label: "Note",
    sublink: [
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
        label: "Listage des étudiants",
      },
    ],
  },
  {
    id: 6,
    icon: Calendar,
    label: "Absence",
    sublink: [
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
        label: "Liste des absences etuditants",
      },
      {
        route: "/absence/enseignant",
        label: "Liste des absences enseignants",
      },
    ],
  },
  {
    id: 9,
    icon: Edit2,
    label: "Composition",
    sublink: [
      {
        route: "/composition/composition_1/ajout",
        label: "Ajouter composition_1",
      },
      {
        route: "/composition/composition_2/ajout",
        label: "Ajouter composition_2",
      },
      {
        route: "/composition/composition_3/ajout",
        label: "Ajouter composition_3",
      },
      {
        route: "/composition/composition_1",
        label: "Liste des compositions_1",
      },

      {
        route: "/composition/composition_2",
        label: "Liste des compositions_2",
      },

      {
        route: "/composition/composition_3",
        label: "Liste des compositions_3",
      },
    ],
  },
  {
    id: 10,
    icon: Book,
    label: "Matiere",
    sublink: [
      { route: "/matiere/ajout", label: "Ajout de matière" },
      { route: "/matiere", label: "Liste des matières" },
    ],
  },
  {
    id: 11,
    icon: Settings,
    label: "UE",
    sublink: [
      {
        route: "/unite_enseignement/ajout",
        label: "Ajouter unité d'enseignement",
      },
      {
        route: "/unite_enseignement",
        label: "Liste unité d'enseignement",
      },
    ],
  },
  {
    id: 12,
    icon: Calendar,
    label: "Demande d'absence",
    sublink: [
      {
        route: "/demande_absence/ajout",
        label: "Ajouter un démande d'absence",
      },
      {
        route: "/demande_absence",
        label: "Liste des demandes d'absences",
      },
    ],
  },
  {
    id: 13,
    icon: Edit2,
    label: "Pédagogie",
    sublink: [
      {
        route: "/pedagogie/ajout",
        label: "Ajouter une pédagogie",
      },
      {
        route: "/pedagogie",
        label: "Liste des pédagogies",
      },
    ],
  },
];
