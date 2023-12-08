"use client";
import AdminForm from "@/views/utilisateur/admin/AdminForm";
import { useEffect, useState } from "react";
import deleteUser from "@/utils/deleteUser";
import { SubmitHandler, useForm } from "react-hook-form";
import Admin from "@/models/utilisateur/Admin";

interface AdministrateurFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function AdministrateurFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: AdministrateurFormProps) {
  //Tout ce qui concerne l'admin
  const { register, handleSubmit, setValue } = useForm<Admin>({
    defaultValues: {
      id_admin: "",
      fonction: "",
      id_utilisateur: "",
    },
  });

  const handleAdmin: SubmitHandler<Admin> = async (admin) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        alert("Utilisateur de type admin créé avec succès");
        router.push("/utilisateur/admin");
      } else {
        await deleteUser(id_utilisateur);
        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  return (
    <AdminForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleAdmin)}
    />
  );
}

export default AdministrateurFormulaire;
