import Enseignant from "@/models/utilisateur/listage/Enseignant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface EnseignantListProps {
  enseignants: Enseignant[];
  handleDelete: Function;
}

function EnseignantList({ enseignants, handleDelete }: EnseignantListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des enseignants
        </h1>
      </div>
      <div className="flex flex-row gap-8 mb-5">
        <form className="flex flex-row w-fit z-0">
          <input
            type="text"
            placeholder="Recherche"
            className="text-gray font-poppins-regular text-sm tracking-wide  px-6 py-3 w-[480px] bg-transparent  border-[1px] border-black rounded-l-md z-10 outline-none focus:border-blue-400"
          />
          <button className=" rounded-r-md border-[1px] border-black px-3 py-3 hover:border-blue-400 transition-all duration-100 ease-in-out">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="flex flex-col relative text-center w-full h-[620px] overflow-y-auto hide-scrollbar">
        <table className="custom-table w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># Enseignant</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Grade</th>
              <th className="table-header-cell">Diplôme</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Mot de passe</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enseignants.map((enseignant) => (
              <tr key={enseignant.id_utilisateur} className="table-row">
                <td className="table-row-cell">{enseignant.id_utilisateur}</td>
                <td className="table-row-cell">{enseignant.id_enseignant}</td>
                <td className="table-row-cell">{enseignant.nom}</td>
                <td className="table-row-cell">{enseignant.prenoms}</td>
                <td className="table-row-cell">{enseignant.sexe}</td>
                <td className="table-row-cell">{enseignant.grade}</td>
                <td className="table-row-cell">{enseignant.diplome}</td>
                <td className="table-row-cell">{enseignant.adresse}</td>
                <td className="table-row-cell">{enseignant.telephone}</td>
                <td className="table-row-cell">{enseignant.email}</td>
                <td className="table-row-cell">{enseignant.mot_de_passe}</td>
                <td className="table-row-cell">
                  <button
                    className="button-info"
                    data-tooltip="Voir plus d'info"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    <Link
                      href={`/utilisateur/enseignant/${enseignant.id_enseignant}`}
                    >
                      Info
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button>
                    <Link
                      href={`/utilisateur/enseignant/edit/${enseignant.id_utilisateur}/${enseignant.id_enseignant}`}
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
                    onClick={() => handleDelete(enseignant.id_utilisateur)}
                  >
                    <FontAwesomeIcon
                      className={`" text-red-500 cursor-pointer" `}
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

export default EnseignantList;
