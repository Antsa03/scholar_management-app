import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_1 from "@/models/composition/Composer_1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_composer_1 } = req.query;
    const composer_1 = await prisma.composer_1.findUnique({
      where: { id_composer_1: id_composer_1?.toString() },
    });
    if (composer_1) {
      const composer_1Props: Composer_1 = req.body;
      const updateCalendrier = await prisma.calendrier_1.update({
        where: { annee_universitaire_1: composer_1.annee_universitaire_1 },
        data: {
          annee_universitaire_1: composer_1Props.annee_universitaire_1,
        },
      });
      res.status(200).json(updateCalendrier);
      if (updateCalendrier) {
        const updateComposer_1 = await prisma.composer_1.update({
          where: { id_composer_1: composer_1.id_composer_1 },
          data: {
            code_matiere: composer_1Props.code_matiere,
            id_ue: composer_1Props.id_ue,
          },
        });
        return res.status(201).json(updateComposer_1);
      } else
        return res.status(500).json("Echec de modification de calendrier_1");
    } else return res.status(404).json("ID composer_1 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
