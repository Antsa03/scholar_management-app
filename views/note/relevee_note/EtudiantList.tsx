import React from "react";
import Link from "next/link";
import { ChevronsRight, Search } from "react-feather";
import Etudiant from "@/models/note_1/listage-etudiants/Etudiant";

interface EtudiantListProps {
  etudiants: Etudiant[];
  search_value: string;
  handleRecherche_etudiant: Function;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EtudiantList({
  etudiants,
  search_value,
  handleRecherche_etudiant,
  handleSearch,
}: EtudiantListProps) {
  if (etudiants)
    return (
      <div className="flex flex-col relative w-full">
        <div className=" ml-4 px-28 mb-5">
          <h1 className="h1 flex flex-row items-center gap-2 ">
            <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
            Liste des étudiants avec l'id calendrier_2
          </h1>
        </div>
        <div className="flex flex-row gap-8">
          <form className="flex flex-row w-fit z-0" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Recherche"
              className="text-gray font-poppins-regular text-sm tracking-wide  px-6 py-3 w-[480px] bg-transparent  border-[1px] border-black rounded-l-md z-10 outline-none focus:border-blue-400"
              value={search_value}
              onChange={(event) => handleRecherche_etudiant(event)}
            />
            <button
              className=" rounded-r-md border-[1px] border-black px-3 py-3 hover:border-blue-400 transition-all duration-100 ease-in-out"
              type="submit"
            >
              <Search></Search>
            </button>
          </form>
        </div>

        <div className="flex flex-col relative text-center w-[1000px] mt-6">
          <table className="custom-table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell"># calendrier_2</th>
                <th className="table-header-cell">N° matricule</th>
                <th className="table-header-cell">Année universitaire</th>
                <th className="table-header-cell">Semestre</th>
                <th className="table-header-cell">Nom</th>
                <th className="table-header-cell">Prénoms</th>
                <th className="table-header-cell">Niveau</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiants?.map((etudiant, index) => (
                <tr key={index} className="table-row">
                  <td className="table-row-cell">{etudiant.id_calendrier_2}</td>
                  <td className="table-row-cell">{etudiant.num_matricule}</td>
                  <td className="table-row-cell">
                    {etudiant.annee_universitaire}
                  </td>
                  <td className="table-row-cell">{etudiant.semestre}</td>
                  <td className="table-row-cell">{etudiant.nom}</td>
                  <td className="table-row-cell">{etudiant.prenoms}</td>
                  <td className="table-row-cell">{etudiant.niveau}</td>
                  <td className="table-row-cell">
                    <Link
                      href={`/note/releve_note/${etudiant.num_matricule}/${etudiant.id_calendrier_2}`}
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  else return <div>Chargement ...</div>;
}

export default EtudiantList;
