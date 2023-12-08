import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Enseignant from "@/models/utilisateur/listage/Enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.enseignant.findMany({
      include: {
        utilisateur: true,
      },
    });

    const enseignants: Enseignant[] = response.map((enseignant) => {
      return {
        id_enseignant: enseignant.id_enseignant,
        grade: enseignant.grade,
        diplome: enseignant.diplome,
        id_utilisateur: enseignant.id_utilisateur,
        photo_profil: enseignant.utilisateur.photo_profil,
        nom: enseignant.utilisateur.nom,
        prenoms: enseignant.utilisateur.prenoms,
        sexe: enseignant.utilisateur.sexe,
        adresse: enseignant.utilisateur.adresse,
        telephone: enseignant.utilisateur.telephone,
        email: enseignant.utilisateur.email,
        mot_de_passe: enseignant.utilisateur.mot_de_passe,
      };
    });
    res.status(200).json(enseignants);
  } catch (error) {
    return res.status(500).json(error);
  }
}
