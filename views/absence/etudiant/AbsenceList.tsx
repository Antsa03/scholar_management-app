import Absence from "@/models/absence/etudiant/listage/Absence";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface AbsenceListProps {
  absences: Absence[];
  handleDelete: Function;
}

function AbsenceList({ absences, handleDelete }: AbsenceListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des absences étudiants
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
      <div className="flex flex-col relative text-center w-full mt-6">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID absence</th>
              <th className="table-header-cell">ID calendrier_3</th>
              <th className="table-header-cell">Date de début de l'absence</th>
              <th className="table-header-cell">Heure de début de l'absence</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Type d'absence</th>
              <th className="table-header-cell">Date de fin d'absence</th>
              <th className="table-header-cell">Heure de fin d'absence</th>
              <th className="table-header-cell">Justifiée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {absences.map((absence, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{absence.id_absence}</td>
                <td className="table-row-cell">{absence.id_calendrier_3}</td>
                <td className="table-row-cell">{absence.date_deb_abs}</td>
                <td className="table-row-cell">{absence.heure_deb_abs}</td>
                <td className="table-row-cell">{absence.num_matricule}</td>
                <td className="table-row-cell">{absence.code_matiere}</td>
                <td className="table-row-cell">{absence.type_absence}</td>
                <td className="table-row-cell">{absence.date_fin_abs}</td>
                <td className="table-row-cell">{absence.heure_fin_abs}</td>
                <td className="table-row-cell">{absence.justifiee}</td>
                <td className="table-row-cell">
                  <Link
                    href={`/absence/etudiant/edit/${absence.id_calendrier_3}/${absence.id_absence}`}
                  >
                    <FontAwesomeIcon
                      className=" cursor-pointer text-yellow-500 "
                      icon={faEdit}
                      fontSize={28}
                    />
                  </Link>
                </td>
                <td className="table-row-cell">
                  <button onClick={() => handleDelete(absence.id_calendrier_3)}>
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

export default AbsenceList;
