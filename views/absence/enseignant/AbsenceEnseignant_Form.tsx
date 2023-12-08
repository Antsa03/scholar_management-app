import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Matiere from "@/models/enseignement/Matiere";
import { Eye, EyeOff } from "react-feather";
import { UseFormRegister } from "react-hook-form";
import Link from "next/link";

interface AbsenceEnseignant_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Absence_enseignant>;
  matieres: Matiere[];
  handleClickShowAllMatieres: Function;
  showAllMatieres: boolean;
  handleClickSuggestion: Function;
  handleClickAllMatiere: Function;
  suggestions: any[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AbsenceEnseignant_Form({
  isUpdate,
  register,
  matieres,
  handleClickShowAllMatieres,
  showAllMatieres,
  handleClickAllMatiere,
  handleClickSuggestion,
  suggestions,

  handleSubmit,
}: AbsenceEnseignant_FormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-fit">
      <div className="container-col-div-input">
        <div className="container-row-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_absence_ens">ID absence enseignant</label>
              <input
                type="text"
                {...register("id_absence_ens")}
                className="input-form"
              />
            </div>
          )}
          <div className="flex flex-row gap-[8px] w-[340px]">
            <div className="container-input">
              <label htmlFor="date_fin_abs_ens">
                Date <p className="text-sm inline">(fin d'absence)</p>
              </label>
              <input
                type="date"
                {...register("date_fin_abs_ens")}
                className="input-form w-[160px] h-[40px]"
              />
            </div>
            <div className="container-input">
              <label htmlFor="heure_fin_abs_ens">
                Heure <p className="text-sm inline">(fin d'absence)</p>
              </label>
              <input
                type="time"
                {...register("heure_fin_abs_ens")}
                className="input-form w-[160px] h-[40px]"
              />
            </div>
          </div>
        </div>

        <div className="container-row-div-input">
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

            {showAllMatieres && (
              <ul className="absolute text-sm translate-y-[100px] max-h-24 overflow-scroll p-2 bg-custom-blue-light border-black border-[1px] rounded-md w-full">
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
            {!showAllMatieres && suggestions && suggestions.length > 0 && (
              <ul>
                {suggestions.map((matiere, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickSuggestion(matiere.code_matiere)}
                  >
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="container-input">
            <label htmlFor="justifiee_ens">Justifiée</label>
            <select {...register("justifiee_ens")} className="select-form">
              <option value="">Sélectionnez une valeur</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
        </div>
      </div>

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
      <Link href={"/absence/enseignant"}>Annuler</Link>
    </form>
  );
}

export default AbsenceEnseignant_Form;
