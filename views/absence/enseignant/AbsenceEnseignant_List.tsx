import Absence_enseignant from "@/models/absence/enseignant/listage/Absence_enseignant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface AbsenceEnseignant_ListProps {
  absence_enseignants: Absence_enseignant[];
  handleDelete: Function;
}

function AbsenceEnseignant_List({
  absence_enseignants,
  handleDelete,
}: AbsenceEnseignant_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des absences enseignants
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
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">ID calendrier_4</th>
              <th className="table-header-cell">
                Date de début d'absence enseignant
              </th>
              <th className="table-header-cell">
                Heure de début d'absence enseignant
              </th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">
                Date de fin d'absence enseignant
              </th>
              <th className="table-header-cell">
                Heure de fin d'absence enseignant
              </th>
              <th className="table-header-cell">Justifiée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {absence_enseignants.map((absence_enseignant, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {absence_enseignant.id_absence_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.id_calendrier_4}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.date_deb_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.heure_deb_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.code_matiere}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.date_fin_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.heure_fin_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.justifiee_ens}
                </td>
                <td className="table-row-cell">
                  <Link
                    href={`/absence/enseignant/edit/${absence_enseignant.id_calendrier_4}/${absence_enseignant.id_absence_ens}`}
                  >
                    <FontAwesomeIcon
                      className=" cursor-pointer text-yellow-500 "
                      icon={faEdit}
                      fontSize={28}
                    />
                  </Link>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() =>
                      handleDelete(absence_enseignant.id_calendrier_4)
                    }
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

export default AbsenceEnseignant_List;
