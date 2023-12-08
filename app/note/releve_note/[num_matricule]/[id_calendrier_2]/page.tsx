"use client";
import Releve_note from "@/models/note_1/Releve_note";
import Relevee_noteList from "@/views/note/relevee_note/Relevee_noteList";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

function ReleveeNote() {
  const params = useParams();
  const [releve_note, setRelevee_note] = useState<Releve_note>();

  const fetchReleveeNote = async () => {
    try {
      const response = await fetch(
        `/api/note_1/releve_note/${params?.num_matricule}/${params?.id_calendrier_2}`
      );
      const data = await response.json();
      setRelevee_note(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params?.num_matricule && params?.id_calendrier_2) {
      fetchReleveeNote();
    }
  }, [params?.num_matricule, params?.id_calendrier_2]);

  const downloadPdf_1 = async () => {
    try {
      const response = await fetch(
        `/api/pdf/releve_note/${params?.num_matricule}/${params?.id_calendrier_2}`
      );
      const pdfBlob = await response.blob();
      saveAs(
        pdfBlob,
        `releve-note-${releve_note?.num_matricule}-${releve_note?.niveau}-S${releve_note?.semestre}.pdf`
      );
      alert("PDF généré et enregistré avec succès !");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la génération du PDF :",
        error
      );
    }
  };

  const downloadPdf = async () => {
    try {
      const response = await fetch(
        `/api/pdf/releve_note/${params?.num_matricule}/${params?.id_calendrier_2}/generate`
      );
      const pdfBlob = await response.blob();
      saveAs(
        pdfBlob,
        `releve-note-${releve_note?.num_matricule}-${releve_note?.niveau}-S${releve_note?.semestre}.pdf`
      );
      alert("PDF généré et enregistré avec succès !");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la génération du PDF :",
        error
      );
    }
  };

  const downloadDoc = async () => {
    try {
      const response = await fetch(
        `/api/doc/releve_note/${params?.num_matricule}/${params?.id_calendrier_2}`
      );
      const docBlob = await response.blob();
      saveAs(
        docBlob,
        `releve-note-${releve_note?.num_matricule}-${releve_note?.niveau}-S${releve_note?.semestre}.docx`
      );
      alert("Docx généré et enregistré avec succès !");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la génération du PDF :",
        error
      );
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await fetch(
        `/api/xlsx/releve-note/${params?.num_matricule}/${params?.id_calendrier_2}`
      );
      const excelBlob = await response.blob();
      saveAs(
        excelBlob,
        `releve-note-excel-${releve_note?.num_matricule}${releve_note?.niveau}-S${releve_note?.semestre}.xlsx`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Relevee_noteList
      releve_note={releve_note}
      generatePdf={downloadPdf}
      generatePdf_1={downloadPdf_1}
      generateDoc={downloadDoc}
      generateExcel={downloadExcel}
    />
  );
}

export default ReleveeNote;
