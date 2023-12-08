"use client";
import { useEffect } from "react";
import deleteUser from "@/utils/deleteUser";
import EnseignantForm from "@/views/utilisateur/enseignant/EnseignantForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Enseignant from "@/models/utilisateur/Enseignant";

interface EnseignantFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function EnseignantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: EnseignantFormProps) {
  //Tout ce qui concernant l'enseignant
  const { register, setValue, handleSubmit } = useForm<Enseignant>({
    defaultValues: {
      id_enseignant: "",
      diplome: "",
      grade: "",
      id_utilisateur: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleEnseignant: SubmitHandler<Enseignant> = async (enseignant) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/enseignant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enseignant),
      });
      if (response.ok) {
        alert("utilisateur de type enseignant créé");
        router.push("/utilisateur/enseignant");
      } else {
        await deleteUser(id_utilisateur);
        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      console.error(error);
    }
  };
  return (
    <EnseignantForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleEnseignant)}
    />
  );
}

export default EnseignantFormulaire;
