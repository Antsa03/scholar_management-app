import Matiere from "@/models/enseignement/Matiere";
import React from "react";
import Link from "next/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronsRight, Search } from "react-feather";

interface MatiereListProps {
  matieres: Matiere[];
  handleDelete: Function;
}

function MatiereList({ matieres, handleDelete }: MatiereListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des matières
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
      <div className="flex flex-col relative text-center max-w-full mt-6">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Désignation matière</th>
              <th className="table-header-cell">Coefficient</th>
              <th className="table-header-cell">Volume horaire</th>
              <th className="table-header-cell">ID enseignant</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {matieres.map((matiere, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{matiere.code_matiere}</td>
                <td className="table-row-cell">
                  {matiere.designation_matiere}
                </td>
                <td className="table-row-cell">{matiere.coeff}</td>
                <td className="table-row-cell">
                  {matiere.v_horaire_matiere} h
                </td>
                <td className="table-row-cell">{matiere.id_enseignant}</td>
                <td className="table-row-cell">
                  <button>
                    <Link href={`/matiere/edit/${matiere.code_matiere}`}>
                      <FontAwesomeIcon
                        className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button onClick={() => handleDelete(matiere.code_matiere)}>
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

export default MatiereList;
