"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Composition1_Form from "@/views/composition/composition_1/Composition1_Form";
import Matiere from "@/models/enseignement/Matiere";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { SubmitHandler, useForm } from "react-hook-form";
import Composer_1 from "@/models/composition/Composer_1";

function Composer1_Ajout() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id_composer_1: "",
      code_matiere: "",
      id_ue: "",
      annee_universitaire_1: "",
    },
  });

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

  const [unite_enseignements, setUnite_enseignements] = useState<
    Array<Unite_enseignement>
  >([]);
  const fetchUnite_enseignements = async () => {
    try {
      const response = await fetch("/api/enseignement/unite_enseignement");
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMatieres();
    fetchUnite_enseignements();
  }, []);

  const handleComposer1: SubmitHandler<Composer_1> = async (composer_1) => {
    try {
      const response = await fetch("/api/composition/composition1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(composer_1),
      });
      if (response.ok) {
        alert("Création de composition1 avec succès");
        router.push("/composition/composition_1");
      } else {
        alert("Echec de la création de composition1");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Composition1_Form
      isUpdate={false}
      register={register}
      matieres={matieres}
      unite_enseignements={unite_enseignements}
      handleSubmit={handleSubmit(handleComposer1)}
    />
  );
}

export default Composer1_Ajout;
