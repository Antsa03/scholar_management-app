import { useEffect, useState } from "react";
import ResponsableLegalForm from "@/views/utilisateur/responsable_legal/ResponsableLegalForm";
import deleteUser from "@/utils/deleteUser";
import { SubmitHandler, useForm } from "react-hook-form";
import Responsable_legal from "@/models/utilisateur/Responsable_legal";

interface ResponsableLegalFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function ResponsableLegalFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: ResponsableLegalFormulaireProps) {
  //Tout ce qui concerne le responsable légal
  const { register, setValue, handleSubmit } = useForm<Responsable_legal>({
    defaultValues: {
      id_responsable_legal: "",
      profession: "",
      id_utilisateur: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleResponsableLegal: SubmitHandler<Responsable_legal> = async (
    responsable_legal
  ) => {
    try {
      await handleUtilisateur();
      const response = await fetch(
        "/api/utilisateur/responsable_legal/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsable_legal),
        }
      );
      if (response.ok) {
        alert("Utilisateur de type responsable légal créé avec succès");
        router.push("/utilisateur/responsable_legal");
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
    <ResponsableLegalForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleResponsableLegal)}
    />
  );
}

export default ResponsableLegalFormulaire;
