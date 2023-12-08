"use client";
import Information from "@/models/information/listage/Information";
import InformationList from "@/views/information/InformationList";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

function Information() {
  const router = useRouter();
  const params = useParams();
  const [information, setInformation] = useState<Array<Information>>([]);
  const fetchInformation = async () => {
    try {
      const response = await fetch(
        `/api/information/etudiant/${params?.num_matricule}`
      );
      const data = await response.json();
      setInformation(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, [params?.num_matricule]);

  const handleDelete = async (id_obs: string) => {
    try {
      const response = await fetch(
        `/api/information/observation/delete/${id_obs}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Suppression de l'information avec succès");
        router.push("/utilisateur/etudiant");
      } else {
        alert("Echec de la suppression");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <InformationList information={information} handleDelete={handleDelete} />
  );
}

export default Information;
