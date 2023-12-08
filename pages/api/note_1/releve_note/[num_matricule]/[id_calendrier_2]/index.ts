import { NextApiRequest, NextApiResponse } from "next";
import {
  fetchNotes,
  calculateSumCoeff,
  calculateSumNotePonderee,
  calculateValues,
} from "@/utils/releveNoteFunction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { num_matricule, id_calendrier_2 } = req.query;
    if (
      typeof num_matricule === "string" &&
      typeof id_calendrier_2 === "string"
    ) {
      const notes = await fetchNotes(num_matricule, id_calendrier_2);
      const somme_coeff = await calculateSumCoeff(
        num_matricule,
        id_calendrier_2
      );
      const somme_note_ponderee = await calculateSumNotePonderee(
        num_matricule,
        id_calendrier_2
      );
      const result = await calculateValues(
        notes,
        somme_coeff,
        somme_note_ponderee
      );

      return res.status(200).json(result);
    } else return res.status(401).json("Paramètre invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}
