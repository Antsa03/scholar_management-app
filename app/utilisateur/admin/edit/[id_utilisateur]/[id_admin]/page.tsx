"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import AdminForm from "@/views/utilisateur/admin/AdminForm";
import { uploadImg } from "@/utils/uploadImg";
import { ChevronsRight } from "react-feather";
import { SubmitHandler, useForm } from "react-hook-form";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Admin from "@/models/utilisateur/Admin";

function AdminEdit() {
  const params = useParams();

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/admin");
  };

  // Téléversement du fichier
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
      if (response.ok) console.log("Utilisateur créé avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'admin
  const admin_form = useForm<Admin>({
    defaultValues: {
      id_admin: "",
      fonction: "",
      id_utilisateur: "",
    },
  });

  const fetchAdmin = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/admin/${params?.id_admin}`
      );
      const data = await response.json();
      admin_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [params?.id_admin]);

  const handleAdmin: SubmitHandler<Admin> = async (admin) => {
    try {
      await utilisateur_form.handleSubmit(handleUtilisateur)();
      admin_form.setValue(
        "id_utilisateur",
        utilisateur_form.watch("id_utilisateur").toString()
      );
      const response = await fetch(
        `/api/utilisateur/admin/update/${params?.id_admin}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(admin),
        }
      );
      if (response.ok) {
        if (file) uploadImg(file);
        alert("Utilisateur de type admin modifié avec succès");
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
            Modifier information de l'administrateur
          </h1>
          <div className="flex flex-row gap-16 items-start justify-center w-full">
            <UtilisateurForm
              isUpdate
              file={file}
              register={utilisateur_form.register}
              setFile={setFile}
            />

            <div className="w-fit self-end">
              {" "}
              <AdminForm
                isUpdate
                register={admin_form.register}
                handleSubmit={admin_form.handleSubmit(handleAdmin)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
