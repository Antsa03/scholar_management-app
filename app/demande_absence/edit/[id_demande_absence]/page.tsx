"use client";
import Demande_absence from "@/models/demande_absence/Demande_absence";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import Demande_absence_Form from "@/views/demande_absence/Demande_absence_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Demande_absence_Edit() {
  const router = useRouter();
  const params = useParams();
  const { register, watch, setValue, reset, handleSubmit } =
    useForm<Demande_absence>({
      defaultValues: {
        id_demande_absence: "",
        num_matricule: "",
        motif: "",
        date_demandee: "",
      },
    });

  const fetchDemande_absence = async () => {
    try {
      const response = await fetch(
        `/api/demande_absence/${params?.id_demande_absence}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDemande_absence();
  }, []);

  const handleDemandeAbsence: SubmitHandler<Demande_absence> = async (
    demande_absence
  ) => {
    try {
      const response = await fetch(
        `/api/demande_absence/update/${params?.id_demande_absence}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(demande_absence),
        }
      );
      if (response.ok) {
        alert("Demande d'absence modifiée avec succès");
        router.push("/demande_absence");
      } else {
        alert("Echec de la modification de demande d'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Afficher la liste des étudiants
  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);
  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  // L'état de l'affichage de l'étudiants
  const [showAllEtudiants, setShowAllEtudiants] = useState<boolean>(false);
  const handleShowAllEtudiants = () => {
    setSuggestions_etudiants([]);
    setShowAllEtudiants(!showAllEtudiants);
  };

  // Suggestions des étudiants
  const [suggestions_etudiants, setSuggestions_etudiants] = useState<
    Array<Etudiant>
  >([]);
  const onNum_matricule_change = () => {
    const num_matricule = watch("num_matricule").toString();
    if (num_matricule !== "") {
      const filteredEtudiant = etudiants.filter(
        (item) =>
          item &&
          item.num_matricule &&
          typeof item.num_matricule === "string" &&
          calculateLevenshteinDistance(item.num_matricule, num_matricule) <= 2
      );
      if (
        filteredEtudiant.some(
          (item) =>
            calculateLevenshteinDistance(item.num_matricule, num_matricule) ===
            0
        )
      ) {
        setSuggestions_etudiants([]);
      } else {
        setSuggestions_etudiants(filteredEtudiant);
      }
    } else setSuggestions_etudiants([]);
  };

  useEffect(() => {
    onNum_matricule_change();
  }, [watch("num_matricule")]);

  const handleClickSuggestion_etudiant = (value: string) => {
    setValue("num_matricule", value);
    setSuggestions_etudiants([]);
  };

  const handleClickAllEtudiant = (value: string) => {
    setValue("num_matricule", value);
    setShowAllEtudiants(false);
    setSuggestions_etudiants([]);
  };
  return (
    <Demande_absence_Form
      isUpdate
      register={register}
      etudiants={etudiants}
      showAllEtudiants={showAllEtudiants}
      handleShowAllEtudiants={handleShowAllEtudiants}
      suggestions_etudiants={suggestions_etudiants}
      handleClickSuggestion_etudiant={handleClickSuggestion_etudiant}
      handleClickAllEtudiant={handleClickAllEtudiant}
      handleSubmit={handleSubmit(handleDemandeAbsence)}
    />
  );
}

export default Demande_absence_Edit;
