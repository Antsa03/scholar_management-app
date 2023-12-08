import Enseignant_info from "@/models/information/Enseignant_info";
import React from "react";

interface EnseignantInfoViewProps {
  enseignant_info: Enseignant_info;
}

function EnseignantInfoView({ enseignant_info }: EnseignantInfoViewProps) {
  return (
    <div>
      <h1>Information à propos de l'enseignant</h1>
      <div>
        <img
          src={`/img/photo_profil/${enseignant_info.photo_profil}`}
          alt="Photo de profil"
          width={150}
          height={150}
        />
      </div>
      <div>
        <p>ID enseignant: {enseignant_info.id_enseignant}</p>
        <p>Nom: {enseignant_info.nom}</p>
        <p>Prénom(s): {enseignant_info.prenoms}</p>
        <p>Sexe: {enseignant_info.sexe}</p>
      </div>
      <div>
        <p>Téléphone: {enseignant_info.telephone}</p>
        <p>Email: {enseignant_info.email}</p>
        <p>Adresse: {enseignant_info.adresse}</p>
      </div>
      <div>
        <p>Matiere enseignée:</p>
        {enseignant_info.matieres.map((matiere, index) => (
          <p key={index}>
            {matiere.code_matiere + ": " + matiere.designation_matiere}
          </p>
        ))}
      </div>
    </div>
  );
}

export default EnseignantInfoView;
