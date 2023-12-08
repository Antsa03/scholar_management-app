"use client";
import { useRouter } from "next/navigation";
import NiveauForm from "@/views/pedagogie/niveau/NiveauForm";
import ParcoursForm from "@/views/pedagogie/parcours/ParcoursForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";

function PedagogieAjout() {
  const router = useRouter();

  // Tout ce qui concerne le niveau
  const niveau_form = useForm<Niveau>({
    defaultValues: {
      id_niveau: "",
      designation_niveau: "",
    },
  });

  const handleSubmitNiveau: SubmitHandler<Niveau> = async (niveau) => {
    try {
      const response = await fetch("/api/pedagogie/niveau/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(niveau),
      });
      if (response.ok) {
        alert("Niveau créé avec succès");
        router.push("/pedagogie");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne parcours
  const parcours_form = useForm<Parcours>({
    defaultValues: {
      id_parcours: "",
      designation_parcours: "",
    },
  });

  const handleSubmitParcours: SubmitHandler<Parcours> = async (parcours) => {
    try {
      const response = await fetch("/api/pedagogie/parcours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parcours),
      });
      if (response.ok) {
        alert("Parcours créé avec succès");
        router.push("/pedagogie");
      } else {
        alert("Echec de créaction de parcours");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-4 px-28 flex flex-row gap-28">
      <NiveauForm
        isUpdate={false}
        register={niveau_form.register}
        handleSubmit={niveau_form.handleSubmit(handleSubmitNiveau)}
      />

      <ParcoursForm
        isUpdate={false}
        register={parcours_form.register}
        handleSubmit={parcours_form.handleSubmit(handleSubmitParcours)}
      />
    </div>
  );
}

export default PedagogieAjout;
