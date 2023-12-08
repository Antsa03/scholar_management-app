import Noter_1 from "@/models/note_1/Noter_1";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface Search {
  num_matricule: string;
  code_matiere: string;
}

interface NoteListProps {
  noter_1: Noter_1[];
  handleDelete: Function;
  register: UseFormRegister<Search>;
  listAll: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function NoteList({
  noter_1,
  handleDelete,
  register,
  listAll,
  handleSubmit,
}: NoteListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des notes des étudiants
        </h1>
      </div>
      <div className="flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="N° matricule"
            {...register("num_matricule")}
            className="text-gray font-poppins-regular text-sm tracking-wide  px-6 py-3 w-[480px] bg-transparent  border-[1px] border-black rounded-md z-10 outline-none focus:border-blue-400 mr-4"
          />
          <input
            type="text"
            placeholder="Code matière"
            {...register("code_matiere")}
            className="text-gray font-poppins-regular text-sm tracking-wide  px-6 py-3 w-[480px] bg-transparent  border-[1px] border-black rounded-l-md z-10 outline-none focus:border-blue-400"
          />
          <button className=" rounded-r-md border-[1px] border-black px-3 py-3 hover:border-blue-400 transition-all duration-100 ease-in-out">
            <Search></Search>
          </button>
        </form>
        <button
          onClick={() => listAll()}
          className="btn bg-slate-400 rounded-lg w-[200px] h-[50px] text-white font-semibold text-lg"
        >
          Tout lister
        </button>
      </div>
      <div className="flex flex-col relative text-center w-[1000px] mt-6">
        {" "}
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># calendrier_2</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Note matière</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {noter_1.map((noter, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{noter.id_noter_1}</td>
                <td className="table-row-cell">{noter.id_calendrier_2}</td>
                <td className="table-row-cell">{noter.num_matricule}</td>
                <td className="table-row-cell">{noter.code_matiere}</td>
                <td className="table-row-cell">{noter.note_matiere}</td>
                <td className="table-row-cell">
                  <button>
                    <Link href={`/note/edit/${noter.id_noter_1}`}>
                      <FontAwesomeIcon
                        className=" text-blue-600 hover:text-blue-700 cursor-pointer"
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button onClick={() => handleDelete(noter.id_noter_1)}>
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

export default NoteList;
