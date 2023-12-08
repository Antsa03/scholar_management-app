import { useEffect } from "react";
import deleteUser from "@/utils/deleteUser";
import EtudiantForm from "@/views/utilisateur/etudiant/EtudiantForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Etudiant from "@/models/utilisateur/Etudiant";

interface EtudiantFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function EtudiantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: EtudiantFormulaireProps) {
  //Tout ce qui concerne l'étudiant
  const { register, setValue, handleSubmit } = useForm<Etudiant>({
    defaultValues: {
      num_matricule: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "",
      id_utilisateur: "",
    },
  });

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  const handleEtudiant: SubmitHandler<Etudiant> = async (etudiant) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etudiant),
      });
      if (response.ok) {
        alert("Utilisateur de l'étudiant créer");
        router.push("/utilisateur/etudiant");
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
    <EtudiantForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleEtudiant)}
    />
  );
}

export default EtudiantFormulaire;
