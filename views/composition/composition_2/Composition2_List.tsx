import Composer_2 from "@/models/composition/Composer_2";
import React from "react";
import Link from "next/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronsRight, Search } from "react-feather";

interface Composition2_ListProps {
  composer_2: Composer_2[];
  handleDelete: Function;
}

function Composition2_List({
  composer_2,
  handleDelete,
}: Composition2_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des composition_2
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
              <th className="table-header-cell">ID parcours</th>
              <th className="table-header-cell">ID unité d'enseignement</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {composer_2.map((composer_2, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{composer_2.id_composer_2}</td>
                <td className="table-row-cell">{composer_2.id_parcours}</td>
                <td className="table-row-cell">{composer_2.id_ue}</td>
                <td className="table-row-cell">
                  <Link
                    href={`/composition/composition_2/edit/${composer_2.id_composer_2}`}
                  >
                    <FontAwesomeIcon
                      className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                      icon={faEdit}
                      fontSize={28}
                    />
                  </Link>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() => handleDelete(composer_2.id_composer_2)}
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

export default Composition2_List;
