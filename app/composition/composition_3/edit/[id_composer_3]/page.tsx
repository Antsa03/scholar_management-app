"use client";
import Composer_3 from "@/models/composition/Composer_3";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import Composition3_Form from "@/views/composition/composition_3/Composition3_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Composer3_Edit() {
  const params = useParams();

  const router = useRouter();

  const { register, reset, handleSubmit } = useForm<Composer_3>({
    defaultValues: {
      id_composer_3: "",
      id_niveau: "",
      id_parcours: "",
    },
  });

  const fetchComposer3 = async () => {
    try {
      const response = await fetch(
        `/api/composition/composition3/${params?.id_composer_3}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComposer3();
  }, [params?.id_composer_3]);

  const [niveaux, setNiveaux] = useState<Array<Niveau>>([]);
  const fetchNiveaux = async () => {
    try {
      const response = await fetch("/api/pedagogie/niveau");
      const data = await response.json();
      setNiveaux(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [parcours, setParcours] = useState<Array<Parcours>>([]);
  const fetchParcours = async () => {
    try {
      const response = await fetch("/api/pedagogie/parcours");
      const data = await response.json();
      setParcours(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNiveaux();
    fetchParcours();
  }, []);

  const handleUpdate: SubmitHandler<Composer_3> = async (composer_3) => {
    try {
      const response = await fetch(
        `/api/composition/composition3/update/${params?.id_composer_3}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(composer_3),
        }
      );
      if (response.ok) {
        alert("Modification de composition3 avec succès");
        router.push("/composition/composition_3");
      } else {
        alert("Echec de la modification de composition3");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Composition3_Form
      isUpdate={true}
      register={register}
      niveaux={niveaux}
      parcours={parcours}
      handleSubmit={handleSubmit(handleUpdate)}
    />
  );
}

export default Composer3_Edit;
