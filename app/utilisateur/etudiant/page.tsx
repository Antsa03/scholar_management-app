"use client";
import { useState, useEffect } from "react";
import EtudiantList from "@/views/utilisateur/etudiant/EtudiantList";
import Etudiant from "@/models/utilisateur/listage/Etudiant";

function Etudiant() {
  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);

  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const handleDelete = async (id_utilisateur: string) => {
    try {
      const response = await fetch(
        `/api/utilisateur/delete/${id_utilisateur}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Utilisateur supprimé avec succès");
        fetchEtudiants();
      } else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_etudiant = async () => {
    try {
      const response = await fetch("/api/recherche/etudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_etudiant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchEtudiants();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_etudiant();
  };

  return (
    <EtudiantList
      etudiants={etudiants}
      handleDelete={handleDelete}
      search_value={search_value}
      handleRecherche_etudiant={handleRecherche_etudiant}
      handleSearch={handleSearch}
    />
  );
}

export default Etudiant;
