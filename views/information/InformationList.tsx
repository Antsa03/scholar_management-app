import Information from "@/models/information/listage/Information";
import React from "react";
import Link from "next/link";

interface InformationListProps {
  information: Information[];
  handleDelete: Function;
}

function InformationList({ information, handleDelete }: InformationListProps) {
  if (information) {
    return information.map((info, index) => (
      <div key={index}>
        <h1 className="h1 mb-4">Information à propos de l'étudiant</h1>
        <h2 className="h2 mt-4 mb-4">ID information: {info.id_information}</h2>
        <div className="px-8 py-8 shadow-custom rounded-custom w-fit">
          <div className="flex fle-row gap-8 m-4">
            <div className=" flex items-center gap-8 text-black px-8 py-4  w-[400px] rounded-full">
              <img
                src={`/img/photo_profil/${info.photo_profil}`}
                alt="Photo de profile"
                width={120}
                height={120}
              />
              <div>
                <p className="text-lg font-semibold ">
                  {info.nom} {info.prenoms}
                </p>
                <p> {info.num_matricule}</p>
              </div>
            </div>
            <div className="w-[400px] ">
              <p className="h2 text-blue-600">Information personnelle :</p>
              <p>Nom: {info.nom}</p>
              <p>Prénom(s): {info.prenoms}</p>
              <p>
                Date et lieu de naissance: {info.date_naissance} à{" "}
                {info.lieu_naissance}
              </p>
              <p>N° matricule: {info.num_matricule}</p>
              <p>Sexe: {info.sexe}</p>
              <p>Nationalité: {info.nationalite}</p>
            </div>
            <div className="w-[400px] mb-4">
              <p className="h2 text-blue-600">Information académique:</p>
              <p>Année universitaire: {info.annee_universitaire}</p>
              <p>ID niveau: {info.id_niveau}</p>
              <p>Niveau: {info.niveau}</p>
              <p>Groupe: {info.groupe}</p>
            </div>
          </div>
          <div className="flex fle-row gap-8 m-4">
            <div className="w-[400px] mb-4">
              <p className="h2 text-blue-600">Contact information :</p>
              <p>Téléphone: {info.telephone}</p>
              <p>Email: {info.email}</p>
              <p>Adresse: {info.adresse}</p>
            </div>
            <div className="w-[400px] mb-4">
              <p className="h2 text-blue-600">Information administrative:</p>
              <p>ID observation: {info.id_obs}</p>
              <p>Admis: {info.admis}</p>
              <p>Situation: {info.situation}</p>
            </div>
            <div className="w-[400px] mb-4">
              <p className="h2 text-blue-600">Dates:</p>

              <p>Date d'inscription: {info.date_insc}</p>
              <p>Date d'arrêt: {info.date_arret}</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 mx-4">
            <button className="bg-blue-500 w-fit text-white rounded px-4 py-2">
              <Link
                href={`/utilisateur/etudiant/information/edit/${info.id_obs}/${info.id_information}`}
              >
                Modifier
              </Link>
            </button>
            <button
              onClick={() => handleDelete(info.id_obs)}
              className="bg-red-500  text-white rounded px-4 py-2 w-fit"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    ));
  } else return <h1>Chargement ou aucune information à afficher</h1>;
}

export default InformationList;
