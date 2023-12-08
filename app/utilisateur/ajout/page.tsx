"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import { uploadImg } from "@/utils/uploadImg";
import RenderedUtilisateurSpecifique from "@/components/utilisateur/ajoutUtilisateur/renderedUtilisateurSpecifique";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";

function Inscription() {
  // Fonction pour naviguer
  const router = useRouter();

  // Téléversement du fichier image
  const [file, setFile] = useState<File>();
  const { register, watch, setValue, handleSubmit } = useForm<Utilisateur>({
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

  useEffect(() => {
    if (file) setValue("photo_profil", file.name);
    else setValue("photo_profil", "user.png");
  }, [file, setValue]);
  // Tout ce qui concerne l'utilisateur
  const handleUtilisateur: SubmitHandler<Utilisateur> = async (utilisateur) => {
    try {
      const response = await fetch("/api/utilisateur/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });
      if (response.ok) {
        console.log("Utilisateur créé avec succès");
        if (file) uploadImg(file);
      } else console.error(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full relative">
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 justify-start">
          {" "}
          <h1 className="h1 flex flex-row items-center gap-2 ">
            <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
            Formulaire d'inscription
          </h1>
          <div className="flex flex-row gap-16 items-start justify-center w-full">
            <UtilisateurForm
              isUpdate={false}
              register={register}
              file={file}
              setFile={setFile}
            />

            <RenderedUtilisateurSpecifique
              handleUtilisateur={handleSubmit(handleUtilisateur)}
              id_utilisateur={watch("id_utilisateur")}
              router={router}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
