"use client";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import EtudiantForm from "@/views/utilisateur/etudiant/EtudiantForm";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadImg } from "@/utils/uploadImg";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Etudiant from "@/models/utilisateur/Etudiant";

function EtudiantEdit() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/etudiant");
  };

  const params = useParams();

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
    if (file) utilisateur_form.setValue("photo_profil", file.name);
    else utilisateur_form.setValue("photo_profil", "user.png");
  }, [file, utilisateur_form.setValue]);

  useEffect(() => {
    fetchUtilisateur();
  }, [params?.id_utilisateur]);

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

  //Tout ce qui concerne l'étudiant
  const etudiant_form = useForm<Etudiant>({
    defaultValues: {
      num_matricule: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "",
      id_utilisateur: "",
    },
  });

  const fetchEtudiant = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/etudiant/${params?.num_matricule}`
      );
      const data = await response.json();
      etudiant_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiant();
  }, [params?.num_matricule]);

  const handleUpdateEtudiant: SubmitHandler<Etudiant> = async (etudiant) => {
    try {
      await utilisateur_form.handleSubmit(handleUtilisateur)();
      etudiant_form.setValue(
        "id_utilisateur",
        utilisateur_form.watch("id_utilisateur").toString()
      );
      const response = await fetch(
        `/api/utilisateur/etudiant/update/${params?.num_matricule}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(etudiant),
        }
      );
      if (response.ok) {
        if (file) uploadImg(file);
        alert("Utilisateur de type étudiant modifié avec succès");
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
            Modifier information de l'étudiant
          </h1>
          <div className="flex flex-row gap-16 items-start justify-center w-full">
            <UtilisateurForm
              isUpdate
              register={utilisateur_form.register}
              file={file}
              setFile={setFile}
            />

            <div className="w-fit self-end">
              {" "}
              <EtudiantForm
                isUpdate
                register={etudiant_form.register}
                handleSubmit={etudiant_form.handleSubmit(handleUpdateEtudiant)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtudiantEdit;
