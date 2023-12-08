"use client";
import { useRouter } from "next/navigation";
import Calendrier_2_Form from "@/views/note/calendrier_2/Calendrier_2_Form";
import { SubmitHandler, useForm } from "react-hook-form";
import Calendrier_2 from "@/models/note_1/Calendrier_2";

function Calendrier_2_Ajout() {
  const router = useRouter();
  //Tout ce qui concerne calendrier_2
  const { register, handleSubmit } = useForm<Calendrier_2>({
    defaultValues: {
      id_calendrier_2: "",
      annee_universitaire_2: "",
      semestre: "",
      session: "",
    },
  });

  const handleCalendrier2: SubmitHandler<Calendrier_2> = async (
    calendrier_2
  ) => {
    try {
      const response = await fetch("/api/note_1/calendrier_2/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendrier_2),
      });
      if (response.ok) {
        alert("Calendrier créé avec succès");
        router.push("/note/calendrier_2");
      } else {
        alert("Echec de la création de calendrier_2");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Calendrier_2_Form
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleCalendrier2)}
    />
  );
}

export default Calendrier_2_Ajout;
