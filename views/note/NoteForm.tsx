import Matiere from "@/models/enseignement/Matiere";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { ChevronsRight, Eye, EyeOff } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface NoteFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Noter_1>;
  calendrier_2: Calendrier_2[];
  matieres: Matiere[];
  handleClickShowAllMatieres: Function;
  showAllMatieres: boolean;
  handleClickSuggestion_matiere: Function;
  handleClickAllMatiere: Function;
  suggestions_matieres: any[];
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function NoteForm({
  isUpdate,
  calendrier_2,
  register,
  matieres,
  handleClickShowAllMatieres,
  showAllMatieres,
  handleClickSuggestion_matiere,
  handleClickAllMatiere,
  suggestions_matieres,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
}: NoteFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout d'un note
      </h1>
      <h2 className="h2">Ajouter note des étudiants</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-fit">
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_noter_1">ID noter_1</label>
                <input
                  type="text"
                  {...register("id_noter_1")}
                  className="input-form"
                />
              </div>
            )}
          </div>

          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="id_calendrier_2">ID calendrier_2</label>
              <select {...register("id_calendrier_2")} className="select-form">
                <option value="">Sélectionner un calendrier_2</option>
                {calendrier_2.map((calendrier_2, index) => (
                  <option key={index} value={calendrier_2.id_calendrier_2}>
                    {calendrier_2.id_calendrier_2 +
                      ": " +
                      calendrier_2.annee_universitaire_2 +
                      " " +
                      calendrier_2.semestre +
                      " " +
                      calendrier_2.session}
                  </option>
                ))}
              </select>
            </div>

            <div className="container-input">
              <label htmlFor="note_matiere">Note</label>
              <input
                type="text"
                {...register("note_matiere")}
                className="input-form"
              />
            </div>
          </div>

          <div className="container-row-div-input mt-4">
            <div className="container-input  relative">
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
                className="input-form w-[340px] h-[40px]"
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
                      onClick={() =>
                        handleClickAllMatiere(matiere.code_matiere)
                      }
                    >
                      {matiere.code_matiere +
                        ": " +
                        matiere.designation_matiere}
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
                          handleClickSuggestion_matiere(matiere.code_matiere)
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
          {`${isUpdate ? "Valider les modifications" : "Ajouter note"}`}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
