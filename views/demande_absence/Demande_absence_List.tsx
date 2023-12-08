import Demande_absence from "@/models/demande_absence/Demande_absence";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Demande_absence_ListProps {
  demande_absences: Demande_absence[];
  handleDelete: Function;
}

function Demande_absence_List({
  demande_absences,
  handleDelete,
}: Demande_absence_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des UE
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
      <div className="flex flex-col relative text-center w-[1000px] mt-6">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Motif</th>
              <th className="table-header-cell">Date demandée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {demande_absences.map((demande_absence, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {demande_absence.id_demande_absence}
                </td>
                <td className="table-row-cell">
                  {demande_absence.num_matricule}
                </td>
                <td className="table-row-cell">{demande_absence.motif}</td>
                <td className="table-row-cell">
                  {demande_absence.date_demandee}
                </td>
                <td className="table-row-cell">
                  <button>
                    <Link
                      href={`/demande_absence/edit/${demande_absence.id_demande_absence}`}
                    >
                      <FontAwesomeIcon
                        className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() =>
                      handleDelete(demande_absence.id_demande_absence)
                    }
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

export default Demande_absence_List;
