import Matiere_note from "@/models/note_1/Matiere_note";
import Releve_note from "@/models/note_1/Releve_note";
import React, { Fragment } from "react";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import UE_note from "@/models/note_1/UE_note";

interface Relevee_noteProps {
  releve_note: Releve_note | undefined;
  generatePdf: Function;
  generatePdf_1: Function;
  generateDoc: Function;
  generateExcel: Function;
}

function Relevee_noteList({
  releve_note,
  generatePdf,
  generatePdf_1,
  generateDoc,
  generateExcel,
}: Relevee_noteProps) {
  if (!releve_note || !releve_note.notes)
    return <h1>Aucun relevé de note à afficher</h1>;
  let moy_ue = 0;
  let coeff_somme = 0;
  let date = new Date();
  const formattedDate = format(date, "d MMMM yyyy", { locale: fr });
  let validation = "";
  let validation_1 = "";
  let moy_ue_tab: string[] = [];
  let validation_tab: string[] = [];
  releve_note.notes.map((ue: UE_note) => {
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
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="ml-auto mr-auto w-full">
          <div className="flex font-bold">
            <div>
              <img src="/img/logo.png" alt="logo" />
              <p>Ecole Supérieur des Technologies de l'Information</p>
            </div>
            <div>
              <p>
                Nom et Prénom(s): {releve_note.nom + " " + releve_note.prenoms}
              </p>
              <p>Relevé des notes - Semestre {releve_note.semestre}</p>
              <p>Session {releve_note.session}</p>
              <p>Année académique: {releve_note.annee_universitaire}</p>
            </div>
            <div className="ml-[260px]">
              <p>N° matricule: {releve_note.num_matricule}</p>
              <p>Inscrit en: {releve_note.niveau}</p>
              <p>Groupe: {releve_note.groupe}</p>
            </div>
          </div>
          <h1 className="text-center font-bold">Notes et résultats</h1>
          <table className="border-[1px] border-black w-[95%]">
            <thead>
              <tr className="border-[1px] border-black text-center pt-[12px] pb-[12px]">
                <th className="border-[1px] border-black w-[95px] pt-[12px] pb-[12px]">
                  Code
                </th>
                <th className="border-[1px] border-black">Matières</th>
                <th className="border-[1px] border-black w-[70px]">Coeff</th>
                <th className="border-[1px] border-black w-[70px]">Note</th>
                <th className="border-[1px] border-black w-[100px]">
                  Note Pondérée
                </th>
                <th className="border-[1px] border-black w-[80px]">Obs</th>
              </tr>
            </thead>
            <tbody>
              {releve_note.notes.map((ue: any, index) => (
                <Fragment key={ue.id_ue}>
                  <tr className="border-[1px] border-black pt-[12px] pb-[12px]">
                    <td
                      colSpan={5}
                      className="border-[1px] border-black font-bold text-center pt-[12px] pb-[12px]"
                    >
                      {"UE " +
                        ue.designation_ue +
                        " (" +
                        ue.credit +
                        " crédits max.)"}
                    </td>
                  </tr>
                  {ue.matieres.map((matiere: any, index: number) => (
                    <tr
                      key={index}
                      className="border-[1px] border-black pt-[12px] pb-[12px]"
                    >
                      <td className="border-[1px] border-black font-bold pt-[12px] pb-[12px]">
                        {matiere.code_matiere}
                      </td>
                      <td className="border-[1px] border-black">
                        {matiere.designation_matiere}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {matiere.coeff}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {matiere.note_matiere}
                      </td>
                      <td className="border-[1px] border-black text-center">
                        {(
                          parseFloat(matiere.coeff.replace(",", ".")) *
                          parseFloat(matiere.note_matiere.replace(",", "."))
                        )
                          .toFixed(2)
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-[1px] border-black pt-[12px] pb-[12px]">
                    <td className="border-[1px] border-black"></td>
                    <td className="border-[1px] border-black"></td>
                    <td
                      colSpan={2}
                      className="border-[1px] border-black font-bold text-center"
                    >
                      Moy UE
                    </td>
                    <td className="border-[1px] border-black pt-[12px] pb-[12px] text-center">
                      {moy_ue_tab[index]}
                    </td>
                    <td className="border-[1px] border-black text-right">
                      {validation_tab[index]}
                    </td>
                  </tr>
                </Fragment>
              ))}
              <tr className="pt-[12px] pb-[12px]">
                <td className="border-[1px] border-black font-bold">
                  {"Semestre " +
                    "(" +
                    releve_note.somme_coeff +
                    " crédits max.)"}
                </td>
                <td className="border-[1px] border-black"></td>
                <td
                  colSpan={2}
                  className="border-[1px] border-black font-bold text-center"
                >
                  Moy.GEN
                </td>
                <td className="border-[1px] border-black pt-[12px] pb-[12px] text-center">
                  {releve_note.moy_gen}
                </td>
                <td className="border-[1px] border-black"></td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 mr-10 float-right">
            Antananarivo le {formattedDate}
          </p>
        </div>
        <div className="text-center border-t-2 border-[#f8A102]">
          <p>
            ESTI - 5 rue Pasteur - Immeuble CCIA - Antanimena - Antananarivo 101
            - Madagascar
          </p>
          <p>
            Tel: +261 (0) 20 22 248 74 - Email : contact@esti.mg - Site :
            www.esti.mg
          </p>
          <p>NIF : 2002526104 - STAT : 85492 11 2016 0 06989</p>
        </div>
      </div>
      <div>
        <button onClick={() => generatePdf()} className="border-2 bg-slate-300">
          PDF sans en-tête et sans en-pieds
        </button>{" "}
        <br />
        <button
          onClick={() => generatePdf_1()}
          className="border-2 bg-slate-300"
        >
          PDF avec en-tête et en-pieds
        </button>{" "}
        <br />
        <button onClick={() => generateDoc()}>Docx</button> <br />
        <button onClick={() => generateExcel()}>Excel</button>
      </div>
    </div>
  );
}

export default Relevee_noteList;
