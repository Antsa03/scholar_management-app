"use client";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import UEForm from "@/views/unite_enseignement/UEForm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function UniteEnseignementEdit() {
  const params = useParams();

  const router = useRouter();
  const { register, reset, handleSubmit } = useForm<Unite_enseignement>({
    defaultValues: {
      id_ue: "",
      designation_ue: "",
      credit: "",
      semestre_ue: "",
    },
  });

  const fetchUE = async () => {
    try {
      const response = await fetch(
        `/api/enseignement/unite_enseignement/${params?.id_ue}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUE();
  }, [params?.id_ue]);

  const handleUpdateUE: SubmitHandler<Unite_enseignement> = async (
    unite_enseignement
  ) => {
    try {
      const response = await fetch(
        `/api/enseignement/unite_enseignement/update/${params?.id_ue}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(unite_enseignement),
        }
      );
      if (response.ok) {
        alert("Unité d'enseignement modifié avec succès");
        router.push("/unite_enseignement");
      } else {
        alert("Echec de la modification");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UEForm
      isUpdate={true}
      register={register}
      handleSubmit={handleSubmit(handleUpdateUE)}
    />
  );
}

export default UniteEnseignementEdit;
