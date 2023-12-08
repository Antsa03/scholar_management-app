import { NextApiRequest, NextApiResponse } from "next";
import UE_note from "@/models/note_1/UE_note";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import Matiere_note from "@/models/note_1/Matiere_note";
import {
  fetchNotes,
  calculateSumCoeff,
  calculateSumNotePonderee,
  calculateValues,
} from "@/utils/releveNoteFunction";
import generatePDF from "@/utils/pdfGenerator";
import Data_releve from "@/models/note_1/Data_releve";
import path from "path";
import fs from "fs";
import generateExcel from "@/utils/generateExcel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    process.setMaxListeners(20);
    const { num_matricule, id_calendrier_2 } = req.query;
    if (
      typeof num_matricule === "string" &&
      typeof id_calendrier_2 === "string"
    ) {
      const allNotes = await fetchNotes(num_matricule, id_calendrier_2);
      const somme_coeff = await calculateSumCoeff(
        num_matricule,
        id_calendrier_2
      );
      const somme_note_ponderee = await calculateSumNotePonderee(
        num_matricule,
        id_calendrier_2
      );
      const result = await calculateValues(
        allNotes,
        somme_coeff,
        somme_note_ponderee
      );

      // variable utiliser dans le pdf
      let moy_ue = 0;
      let moy_ue_tab: string[] = [];
      let coeff_somme = 0;
      let date = new Date();
      const formattedDate = format(date, "d MMMM yyyy", { locale: fr });
      let validation = "";
      let validation_1 = "";
      let validation_tab: string[] = [];
      result.notes.map((ue: UE_note) => {
        moy_ue = 0;
        coeff_somme = 0;
        ue.matieres.map((matiere: Matiere_note) => {
          validation_1 = "";
          coeff_somme += parseFloat(matiere.coeff.replace(",", "."));
          moy_ue +=
            parseFloat(matiere.coeff.replace(",", ".")) *
            parseFloat(matiere.note_matiere.replace(",", "."));
          if (parseFloat(matiere.note_matiere.replace(",", ".")) < 5)
            validation_1 = "Non validé";
        });
        moy_ue = moy_ue / coeff_somme;
        moy_ue_tab.push(moy_ue.toFixed(2).replace(".", ","));
        validation =
          validation_1 === "Non validé"
            ? validation_1
            : moy_ue >= 10
            ? "Validé"
            : "Non validé";
        validation_tab.push(validation);
      });

      const imagePath = path.resolve(process.cwd(), "public/img/logo.png");
      const imageBuffer = fs.readFileSync(imagePath);
      const imageBase64 = imageBuffer.toString("base64");
      const data: Data_releve = {
        imageBase64: imageBase64,
        result: result,
        moy_ue_tab: moy_ue_tab,
        validation_tab: validation_tab,
        formattedDate: formattedDate,
      };
      const excelData = await generateExcel(data, "releve-note-excel");
      return res.send(excelData);
    } else return res.status(401).json("Paramètre invalide");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
