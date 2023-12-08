import Demande_absence from "@/models/demande_absence/Demande_absence";
import React from "react";
import Link from "next/link";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Eye, EyeOff } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface Demande_absence_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Demande_absence>;
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Demande_absence_Form({
  isUpdate,
  register,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
}: Demande_absence_FormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout d'unde démande d'absence
      </h1>
      <h2 className="h2">Ajouter d'une démande d'absence</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit gap-1">
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {" "}
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_demande_absence">ID demande d'absence</label>
                <input
                  type="text"
                  {...register("id_demande_absence")}
                  className="input-form"
                />
              </div>
            )}
            <div className="flex flex-row gap-[8px] w-[340px]">
              <div className="container-input relative">
                <label htmlFor="num_matricule">N° matricule</label>

                <input
                  type="text"
                  {...register("num_matricule")}
                  className="input-form w-[340px] h-[40px]"
                />
                <div
                  onClick={() => handleShowAllEtudiants()}
                  className="absolute bottom-0 right-0 translate-y-6"
                >
                  {showAllEtudiants ? (
                    <p className="text-[12px] text-gray-600 tracking-wide flex flex-row gap-1 items-center">
                      <EyeOff size={14} />
                      Cacher les suggestions
                    </p>
                  ) : (
                    <p className="text-[12px] text-gray-600 tracking-wide flex flex-row gap-1 items-center">
                      {" "}
                      <Eye size={14} />
                      Montrer les suggestions
                    </p>
                  )}
                </div>

                {showAllEtudiants && (
                  <ul className="absolute text-sm translate-y-[100px] max-h-24 overflow-scroll p-2 bg-custom-blue-light border-black border-[1px] rounded-md w-full z-20">
                    {etudiants.map((etudiant, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleClickAllEtudiant(etudiant.num_matricule)
                        }
                      >
                        {etudiant.num_matricule +
                          ": " +
                          etudiant.nom +
                          " " +
                          etudiant.prenoms}
                      </li>
                    ))}
                  </ul>
                )}
                {!showAllEtudiants &&
                  suggestions_etudiants &&
                  suggestions_etudiants.length > 0 && (
                    <ul>
                      {suggestions_etudiants.map((etudiant, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleClickSuggestion_etudiant(
                              etudiant.num_matricule
                            )
                          }
                        >
                          {etudiant.num_matricule +
                            ": " +
                            etudiant.nom +
                            " " +
                            etudiant.prenoms}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          </div>
          <div className="container-row-div-input">
            {" "}
            <div className="container-input">
              <label htmlFor="date_demandee">Date demandée</label>
              <input
                type="date"
                {...register("date_demandee")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="motif">Motif</label>
              <textarea
                {...register("motif")}
                cols={60}
                rows={3}
                className="input-form w-[728px] h-[80px]"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-12 ml-auto">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-end ml-auto"
          >
            <FontAwesomeIcon
              className="text-gray-200"
              icon={faPlus}
              width={16}
              height={16}
            />
            {`${isUpdate ? "Valider les modifications" : "Ajouter l'absence"}`}
          </button>
          <Link href={"/demande_absence"} className="button-cancel-form">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Demande_absence_Form;
