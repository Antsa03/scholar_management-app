import Composer_3 from "@/models/composition/Composer_3";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Composition3_ListProps {
  composer_3: Composer_3[];
  handleDelete: Function;
}

function Composition3_List({
  composer_3,
  handleDelete,
}: Composition3_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des composition_3
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
              <th className="table-header-cell">ID niveau</th>
              <th className="table-header-cell">ID parcours</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {composer_3.map((composer_3, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{composer_3.id_composer_3}</td>
                <td className="table-row-cell">{composer_3.id_niveau}</td>
                <td className="table-row-cell"> {composer_3.id_parcours}</td>
                <td className="table-row-cell">
                  <button>
                    {" "}
                    <Link
                      href={`/composition/composition_3/edit/${composer_3.id_composer_3}`}
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
                    onClick={() => handleDelete(composer_3.id_composer_3)}
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

export default Composition3_List;
