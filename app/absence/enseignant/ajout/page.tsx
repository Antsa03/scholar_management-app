"use client";
import Calendrier_4_Form from "@/views/absence/enseignant/calendrier_4/Calendrier_4_Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AbsenceEnseignant_Form from "@/views/absence/enseignant/AbsenceEnseignant_Form";
import Matiere from "@/models/enseignement/Matiere";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Calendrier_4 from "@/models/absence/enseignant/Calendrier_4";
import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";

function AbsenceEnseignant_Ajout() {
  const router = useRouter();

  // Tout ce qui concerne calendrier_4
  const calendrier_4_form = useForm<Calendrier_4>({
    defaultValues: {
      id_calendrier_4: "",
      date_deb_abs_ens: "",
      heure_deb_abs_ens: "",
    },
  });

  const handleCalendrier_4: SubmitHandler<Calendrier_4> = async (
    calendrier_4
  ) => {
    try {
      const response = await fetch(
        "/api/absence/enseignant/calendrier_4/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_4),
        }
      );
      if (response.ok) console.log("Calendrier_4 crée avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'absence enseignant
  const absence_enseignant_form = useForm<Absence_enseignant>({
    defaultValues: {
      id_absence_ens: "",
      code_matiere: "",
      id_calendrier_4: "",
      date_fin_abs_ens: "",
      heure_fin_abs_ens: "",
      justifiee_ens: "",
    },
  });

  const handleAbsenceEnseignant: SubmitHandler<Absence_enseignant> = async (
    absence_enseignant
  ) => {
    try {
      await calendrier_4_form.handleSubmit(handleCalendrier_4)();
      absence_enseignant_form.setValue(
        "id_calendrier_4",
        calendrier_4_form.watch("id_calendrier_4").toString()
      );
      const response = await fetch("/api/absence/enseignant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absence_enseignant),
      });
      if (response.ok) {
        alert("Absence enseignant crée avec succès");
        router.push("/absence/enseignant");
      } else {
        alert("Echec de la création de l'absence enseignant");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Afficher toutes les matières
  const [matieres, setMatieres] = useState<Array<Matiere>>([]);
  const fetchMatieres = async () => {
    try {
      const response = await fetch("/api/enseignement/matiere");
      const data = await response.json();
      setMatieres(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  //L'état de l'affichage du liste des matières
  const [showAllMatieres, setShowMatieres] = useState<boolean>(false);
  const handleClickShowAllMatiere = () => {
    setShowMatieres(!showAllMatieres);
  };

  // // L'état de l'affichage de chaque matière
  const [suggestions, setSuggestions] = useState<any>();
  const onCode_matiere_change = () => {
    const code_matiere = absence_enseignant_form.watch("code_matiere");
    if (code_matiere.toString() !== "") {
      const filteredMatieres = matieres.filter(
        (item) =>
          item &&
          item.code_matiere &&
          typeof item.code_matiere === "string" &&
          calculateLevenshteinDistance(
            item.code_matiere.toUpperCase(),
            code_matiere.toString().toUpperCase()
          ) <= 5
      );

      // Si une correspondance exacte est trouvée, réinitialisez les suggestions
      if (
        filteredMatieres.some(
          (item) =>
            calculateLevenshteinDistance(
              item.code_matiere.toUpperCase(),
              code_matiere.toString().toUpperCase()
            ) === 0
        )
      ) {
        setSuggestions([]);
      } else {
        setSuggestions(filteredMatieres);
      }
    } else setSuggestions([]);
  };

  useEffect(() => {
    onCode_matiere_change();
  }, [absence_enseignant_form.watch("code_matiere")]);

  const handleClickSuggestion = (value: string) => {
    absence_enseignant_form.setValue("code_matiere", value);
  };

  const handleClickAllMatiere = (value: string) => {
    absence_enseignant_form.setValue("code_matiere", value);
    setShowMatieres(false);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'absence pour enseignant
      </h1>
      <h2 className="h2">Ajouter une absence pour enseignant</h2>
      <Calendrier_4_Form
        isUpdate={false}
        register={calendrier_4_form.register}
      />
      <AbsenceEnseignant_Form
        isUpdate={false}
        register={absence_enseignant_form.register}
        matieres={matieres}
        handleClickAllMatiere={handleClickAllMatiere}
        handleClickSuggestion={handleClickSuggestion}
        handleClickShowAllMatieres={handleClickShowAllMatiere}
        showAllMatieres={showAllMatieres}
        suggestions={suggestions}
        handleSubmit={absence_enseignant_form.handleSubmit(
          handleAbsenceEnseignant
        )}
      />
    </div>
  );
}

export default AbsenceEnseignant_Ajout;
