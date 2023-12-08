import Composer_1 from "@/models/composition/Composer_1";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Composition1_ListProps {
  composer_1: Composer_1[];
  handleDelete: Function;
}

function Composition1_List({
  composer_1,
  handleDelete,
}: Composition1_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des composition_1
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
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell"># unité d'enseignement</th>
              <th className="table-header-cell">Année universitaire</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {composer_1.map((composer_1, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{composer_1.id_composer_1}</td>
                <td className="table-row-cell">{composer_1.code_matiere}</td>
                <td className="table-row-cell">{composer_1.id_ue}</td>
                <td className="table-row-cell">
                  {composer_1.annee_universitaire_1}
                </td>
                <td className="table-row-cell">
                  <button>
                    <Link
                      href={`/composition/composition_1/edit/${composer_1.id_composer_1}`}
                    >
                      {" "}
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
                    onClick={() => handleDelete(composer_1.id_composer_1)}
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

export default Composition1_List;
