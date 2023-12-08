"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import EnseignantForm from "@/views/utilisateur/enseignant/EnseignantForm";
import { uploadImg } from "@/utils/uploadImg";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Enseignant from "@/models/utilisateur/Enseignant";

function EnseignantEdit() {
  const params = useParams();

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/enseignant");
  };

  // Téléversement du fichier image
  const [file, setFile] = useState<File>();

  // Tout ce qui concerne l'utilisateur
  const utilisateur_form = useForm<Utilisateur>({
    defaultValues: {
      id_utilisateur: "",
      photo_profil: "",
      nom: "",
      prenoms: "",
      sexe: "",
      adresse: "",
      telephone: "",
      email: "",
      mot_de_passe: "",
    },
  });

  const fetchUtilisateur = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/${params?.id_utilisateur}`
      );
      const data = await response.json();
      utilisateur_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUtilisateur();
  }, [params?.id_utilisateur]);

  useEffect(() => {
    if (file) utilisateur_form.setValue("photo_profil", file.name);
    else utilisateur_form.setValue("photo_profil", "user.png");
  }, [file, utilisateur_form.setValue]);

  const handleUtilisateur: SubmitHandler<Utilisateur> = async (utilisateur) => {
    try {
      const response = await fetch(
        `/api/utilisateur/update/${params?.id_utilisateur}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(utilisateur),
        }
      );
      if (response.ok) console.log("Utilisateur modifié avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'enseignant
  const enseignant_form = useForm<Enseignant>({
    defaultValues: {
      id_enseignant: "",
      grade: "",
      diplome: "",
      id_utilisateur: "",
    },
  });

  const fetchEnseignant = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/enseignant/${params?.id_enseignant}`
      );
      const data = await response.json();
      enseignant_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignant();
  }, [params?.id_enseignant]);

  const handleEnseignant: SubmitHandler<Enseignant> = async (enseignant) => {
    try {
      await utilisateur_form.handleSubmit(handleUtilisateur)();
      enseignant_form.setValue(
        "id_utilisateur",
        utilisateur_form.watch("id_utilisateur").toString()
      );
      const response = await fetch(
        `/api/utilisateur/enseignant/update/${params?.id_enseignant}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enseignant),
        }
      );
      if (response.ok) {
        if (file) uploadImg(file);
        alert("Utilisateur de type enseignant modifié avec succès");
        handleNavigation();
      } else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full relative">
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 justify-start">
          <h1 className="h1 flex flex-row items-center gap-2 ">
            <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
            Modifier information de l'enseignant
          </h1>
          <div className="flex flex-row gap-16 items-start justify-center w-full">
            <UtilisateurForm
              isUpdate
              register={utilisateur_form.register}
              file={file}
              setFile={setFile}
            />

            <div className="w-fit self-end">
              <EnseignantForm
                isUpdate
                register={enseignant_form.register}
                handleSubmit={enseignant_form.handleSubmit(handleEnseignant)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnseignantEdit;
