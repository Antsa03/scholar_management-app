"use client";
import Etudiant from "@/models/note_1/listage-etudiants/Etudiant";
import EtudiantList from "@/views/note/relevee_note/EtudiantList";
import React, { useEffect, useState } from "react";

function Note_Etudiant() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/note_1/releve_note");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const [search_value, setSearch_value] = useState("");
  const fetchEtudiant_recherche = async () => {
    try {
      const response = await fetch("/api/recherche/note_1/liste-etudiants", {
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
    fetchEtudiant_recherche();
  };

  return (
    <EtudiantList
      etudiants={etudiants}
      search_value={search_value}
      handleRecherche_etudiant={handleRecherche_etudiant}
      handleSearch={handleSearch}
    />
  );
}

export default Note_Etudiant;
