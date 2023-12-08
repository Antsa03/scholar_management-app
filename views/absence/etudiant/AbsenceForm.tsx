import Absence from "@/models/absence/etudiant/Absence";
import React from "react";
import Link from "next/link";
import Matiere from "@/models/enseignement/Matiere";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { Eye, EyeOff } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface AbsenceFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Absence>;
  matieres: Matiere[];
  suggestions_matieres: any[];
  showAllMatieres: boolean;
  handleClickShowAllMatieres: Function;
  handleClickSuggestion: Function;
  handleClickAllMatiere: Function;
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AbsenceForm({
  isUpdate,
  register,
  matieres,
  suggestions_matieres,
  showAllMatieres,
  handleClickShowAllMatieres,
  handleClickSuggestion,
  handleClickAllMatiere,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
}: AbsenceFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-fit">
      <div className="container-col-div-input">
        <div className="container-row-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_absence">ID absence</label>
              <input
                type="text"
                {...register("id_absence")}
                className="input-form"
              />
            </div>
          )}
          <div className="flex flex-row gap-[8px] w-[340px]">
            <div className="container-input">
              <label htmlFor="date_fin_abs">
                Date <p className="text-sm inline">(fin d'absence)</p>
              </label>
              <input
                type="date"
                {...register("date_fin_abs")}
                className="input-form w-[160px] h-[40px]"
              />
            </div>
            <div className="container-input">
              <label htmlFor="heure_fin_abs">
                Heure <p className="text-sm inline">(fin d'absence)</p>
              </label>
              <input
                type="time"
                {...register("heure_fin_abs")}
                className="input-form w-[160px] h-[40px]"
              />
            </div>
          </div>
        </div>
        <div className="container-row-div-input">
          <div className="container-input">
            <label htmlFor="type_absence">Type d'absence</label>
            <select {...register("type_absence")} className="input-form">
              <option value="">Choisissez une valeur</option>
              <option value="Cours">Cours</option>
              <option value="Examen">Examen</option>
            </select>
          </div>
          <div className="container-input">
            <label htmlFor="justifiee">Justifiée</label>
            <select {...register("justifiee")} className="input-form">
              <option value="">Choisissez une valeur</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
        </div>
        <div className="container-row-div-input mb-2">
          <div className="container-input relative">
            <label htmlFor="num_matricule">N° matricule</label>
            <input
              type="text"
              {...register("num_matricule")}
              className="input-form"
            />
            <div
              onClick={() => handleShowAllEtudiants()}
              className="absolute bottom-0 right-0 translate-y-6"
            >
              {showAllEtudiants ? (
                <p className="text-[12px] text-gray-600 tracking-wide flex flex-row gap-1 items-center">
                  {" "}
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
              <ul className="absolute text-sm translate-y-[100px] max-h-24 overflow-scroll p-2 bg-custom-blue-light border-black border-[1px] rounded-md w-full">
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
                        handleClickSuggestion_etudiant(etudiant.num_matricule)
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
          <div className="container-input relative">
            <label htmlFor="code_matiere">Code matière</label>
            <input
              type="text"
              {...register("code_matiere")}
              className="input-form"
            />
            <div
              onClick={() => handleClickShowAllMatieres()}
              className="absolute bottom-0 right-0 translate-y-6"
            >
              {showAllMatieres ? (
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
            {showAllMatieres && (
              <ul className="absolute text-sm translate-y-[100px] max-h-24 overflow-scroll p-2 bg-custom-blue-light border-black border-[1px] rounded-md w-full z-20">
                {matieres.map((matiere, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickAllMatiere(matiere.code_matiere)}
                  >
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </li>
                ))}
              </ul>
            )}
            {!showAllMatieres &&
              suggestions_matieres &&
              suggestions_matieres.length > 0 && (
                <ul>
                  {suggestions_matieres.map((matiere, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleClickSuggestion(matiere.code_matiere)
                      }
                    >
                      {matiere.code_matiere +
                        ": " +
                        matiere.designation_matiere}
                    </li>
                  ))}
                </ul>
              )}
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
        <button className="button-cancel-form">
          <Link href="/absence/etudiant">Annuler</Link>
        </button>
      </div>
    </form>
  );
}

export default AbsenceForm;
