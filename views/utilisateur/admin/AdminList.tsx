import Admin from "@/models/utilisateur/listage/Admin";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface AdminListProps {
  admins: Admin[];
  handleDelete: Function;
}

function AdminList({ admins, handleDelete }: AdminListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-4 px-28 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des admninistrateurs
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
        <table className="custom-table ">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># Admin</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Fonction</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Mot de passe</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id_admin} className="table-row">
                <td className="table-row-cell">{admin.id_utilisateur}</td>
                <td className="table-row-cell">{admin.id_admin}</td>
                <td className="table-row-cell">{admin.nom}</td>
                <td className="table-row-cell">{admin.prenoms}</td>
                <td className="table-row-cell">{admin.sexe}</td>
                <td className="table-row-cell">{admin.fonction}</td>
                <td className="table-row-cell">{admin.adresse}</td>
                <td className="table-row-cell">{admin.telephone}</td>
                <td className="table-row-cell-email">{admin.email}</td>
                <td className="table-row-cell">{admin.mot_de_passe}</td>
                <td className="table-row-cell">
                  <button>
                    <Link
                      href={`/utilisateur/admin/edit/${admin.id_utilisateur}/${admin.id_admin}`}
                    >
                      <FontAwesomeIcon
                        className=" cursor-pointer text-yellow-500 "
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => handleDelete(admin.id_utilisateur)}>
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

export default AdminList;
