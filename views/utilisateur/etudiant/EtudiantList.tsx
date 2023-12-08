import Etudiant from "@/models/utilisateur/listage/Etudiant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Hashtag from "../../../public/img/hashtag.png";
import Image from "next/image";
import { ChevronRight, ChevronsRight, Search } from "react-feather";

interface EtudiantListProps {
  etudiants: Etudiant[];
  handleDelete: Function;
  search_value: string;
  handleRecherche_etudiant: Function;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EtudiantList({
  etudiants,
  handleDelete,
  search_value,
  handleRecherche_etudiant,
  handleSearch,
}: EtudiantListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des étudiants
        </h1>
      </div>
      <div className="flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Recherche"
            value={search_value}
            onChange={(event) => handleRecherche_etudiant(event)}
            className="text-gray font-poppins-regular text-sm tracking-wide  px-6 py-3 w-[480px] bg-transparent  border-[1px] border-black rounded-l-md z-10 outline-none focus:border-blue-400"
          />
          <button className=" rounded-r-md border-[1px] border-black px-3 py-3 hover:border-blue-400 transition-all duration-100 ease-in-out">
            <Search></Search>
          </button>
        </form>
        <div className="w-1 rounded-md h-12 bg-black "> </div>
        <Link
          href={"/utilisateur/etudiant/information/ajout"}
          className="button-add-info block"
        >
          <FontAwesomeIcon
            className={`" text-green-700 cursor-pointer" `}
            icon={faAdd}
            fontSize={16}
          />
          Ajout d'information de l'étudiant
        </Link>
      </div>

      <div className="flex flex-col relative text-center w-full">
        <table className="custom-table mt-6">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prenoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Date de naissance</th>
              <th className="table-header-cell">Lieu de naissance</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Nationalité</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Mot de passe</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{etudiant.id_utilisateur}</td>
                <td className="table-row-cell">{etudiant.num_matricule}</td>
                <td className="table-row-cell">{etudiant.nom}</td>
                <td className="table-row-cell">{etudiant.prenoms}</td>
                <td className="table-row-cell">{etudiant.sexe}</td>
                <td className="table-row-cell">
                  {etudiant.date_naissance.toLocaleString().slice(0, 10)}
                </td>
                <td className="table-row-cell">{etudiant.lieu_naissance}</td>
                <td className="table-row-cell">{etudiant.adresse}</td>
                <td className="table-row-cell">{etudiant.telephone}</td>
                <td className="table-row-cell">{etudiant.nationalite}</td>
                <td className="table-row-cell-email">{etudiant.email}</td>
                <td className="table-row-cell">{etudiant.mot_de_passe}</td>
                <td className="table-row-cell">
                  <button
                    className="button-info"
                    data-tooltip="Voir plus d'info"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    <Link
                      href={`/utilisateur/etudiant/information/${etudiant.num_matricule}`}
                    >
                      Info
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/utilisateur/etudiant/edit/${etudiant.id_utilisateur}/${etudiant.num_matricule}`}
                    >
                      <FontAwesomeIcon
                        className=" cursor-pointer text-yellow-500 "
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() => handleDelete(etudiant.id_utilisateur)}
                    className="tooltip-supprimer"
                    data-tooltip="Supprimer"
                  >
                    <FontAwesomeIcon
                      className={`" text-custom-red cursor-pointer" `}
                      icon={faTrash}
                      fontSize={28}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EtudiantList;
