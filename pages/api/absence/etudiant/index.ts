import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.absence.findMany({
      include: {
        calendrier_3: true,
      },
    });
    const absences = response.map((absence) => {
      return {
        id_absence: absence.id_absence,
        id_calendrier_3: absence.id_calendrier_3,
        date_deb_abs: absence.calendrier_3.date_deb_abs.toLocaleDateString(),
        heure_deb_abs: absence.calendrier_3.heure_deb_abs
          .toTimeString()
          .slice(0, 5),
        num_matricule: absence.num_matricule,
        code_matiere: absence.code_matiere,
        type_absence: absence.type_absence,
        date_fin_abs: absence.date_fin_abs.toLocaleDateString(),
        heure_fin_abs: absence.heure_fin_abs.toTimeString().slice(0, 5),
        justifiee: absence.justifiee ? "Oui" : "Non",
      };
    });
    return res.status(200).json(absences);
  } catch (error) {
    return res.status(500).json(error);
  }
}
