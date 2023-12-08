import Parcours from "@/models/pedagogie/Parcours";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface ParcoursListProps {
  parcours: Parcours[];
  handleDelete: Function;
}

function ParcoursList({ parcours, handleDelete }: ParcoursListProps) {
  return (
    <div className="w-[800px]">
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Listage des parcours
      </h1>
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
      <div className="flex flex-col relative text-center max-w-[600px] mt-6">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID parcours</th>
              <th className="table-header-cell">Désignation parcours</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parcours.map((parcours, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell"> {parcours.id_parcours}</td>
                <td className="table-row-cell">
                  {parcours.designation_parcours}
                </td>
                <td className="table-row-cell">
                  <button>
                    {" "}
                    <Link href={`/pedagogie/edit/${parcours.id_parcours}`}>
                      <FontAwesomeIcon
                        className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td
                  onClick={() => handleDelete(parcours.id_parcours)}
                  className="table-row-cell"
                >
                  <button>
                    {" "}
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

export default ParcoursList;
