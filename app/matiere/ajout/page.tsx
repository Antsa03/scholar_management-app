"use client";
import Matiere from "@/models/enseignement/Matiere";
import Enseignant from "@/models/utilisateur/listage/Enseignant";
import MatiereForm from "@/views/matiere/MatiereForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function MatiereAjout() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Matiere>({
    defaultValues: {
      code_matiere: "",
      designation_matiere: "",
      coeff: "",
      v_horaire_matiere: "",
      description: "",
      id_enseignant: "",
    },
  });

  const handleSubmitMatiere: SubmitHandler<Matiere> = async (matiere) => {
    try {
      const response = await fetch("/api/enseignement/matiere/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matiere),
      });
      if (response.ok) {
        alert("Matière créée avec succès");
        router.push("/matiere");
      } else {
        alert("Echec de la création de matière");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [enseignants, setEnseignant] = useState<Array<Enseignant>>([]);
  const fetchEnseignants = async () => {
    try {
      const response = await fetch("/api/utilisateur/enseignant");
      const data = await response.json();
      setEnseignant(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignants();
  }, []);

  return (
    <MatiereForm
      isUpdate={false}
      register={register}
      enseignants={enseignants}
      handleSubmit={handleSubmit(handleSubmitMatiere)}
    />
  );
}

export default MatiereAjout;
