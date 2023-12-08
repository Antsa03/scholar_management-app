import React from "react";
import Relation from "@/models/utilisateur/listage/Relation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface RelationListProps {
  relations: Relation[];
  handleDeleteRelation: Function;
}

function RelationList({ relations, handleDeleteRelation }: RelationListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des relations parentales
        </h1>
      </div>
      <div className="flex flex-row gap-8">
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
      <div className="flex flex-col relative text-center w-full">
        {" "}
        <table className="custom-table mt-6">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID Relation</th>
              <th className="table-header-cell">ID Responsable légal</th>
              <th className="table-header-cell">Nom du responsable légal</th>
              <th className="table-header-cell">
                Prénoms du responsable légal
              </th>
              <th className="table-header-cell">N° matricule de l'étudiant</th>
              <th className="table-header-cell">Nom de l'étudiant</th>
              <th className="table-header-cell">Prénoms de l'étudiant</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {relations.map((relation, index) => (
              <tr className="table-row" key={index}>
                <td className="table-row-cell">{relation.id_relation}</td>
                <td className="table-row-cell">
                  {relation.id_responsable_legal}
                </td>
                <td className="table-row-cell">
                  {relation.nom_responsable_legal}
                </td>
                <td className="table-row-cell">
                  {relation.prenoms_responsable_legal}
                </td>
                <td className="table-row-cell">{relation.num_matricule}</td>
                <td className="table-row-cell">{relation.nom_etudiant}</td>
                <td className="table-row-cell">{relation.prenoms_etudiant}</td>
                <td className="table-row-cell">
                  <Link
                    href={`/utilisateur/relation/edit/${relation.id_relation}`}
                  >
                    <FontAwesomeIcon
                      className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                      icon={faEdit}
                      fontSize={28}
                    />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteRelation(relation.id_relation)}
                  >
                    <FontAwesomeIcon
                      className={`" text-red-600 hover:text-red-700 cursor-pointer" `}
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

export default RelationList;
