import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.responsable_legal.findMany({
      include: {
        utilisateur: true,
      },
    });

    const responsable_legals: Responsable_legal[] = response.map(
      (responsable_legal) => {
        return {
          id_utilisateur: responsable_legal.id_utilisateur,
          id_reponsable_legal: responsable_legal.id_responsable_legal,
          photo_profil: responsable_legal.utilisateur.photo_profil,
          nom: responsable_legal.utilisateur.nom,
          prenoms: responsable_legal.utilisateur.prenoms,
          sexe: responsable_legal.utilisateur.sexe,
          profession: responsable_legal.profession,
          adresse: responsable_legal.utilisateur.adresse,
          telephone: responsable_legal.utilisateur.telephone,
          email: responsable_legal.utilisateur.email,
          mot_de_passe: responsable_legal.utilisateur.mot_de_passe,
        };
      }
    );
    return res.status(200).json(responsable_legals);
  } catch (error) {
    return res.status(500).json(error);
  }
}
