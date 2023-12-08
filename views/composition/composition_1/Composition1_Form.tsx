import Composer_1 from "@/models/composition/Composer_1";
import Matiere from "@/models/enseignement/Matiere";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface Composition1_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_1>;
  matieres: Matiere[];
  unite_enseignements: Unite_enseignement[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Composition1_Form({
  isUpdate,
  register,
  matieres,
  unite_enseignements,
  handleSubmit,
}: Composition1_FormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout composition_1
      </h1>
      <h2 className="h2">Ajouter des composition_1</h2>
      <form onSubmit={handleSubmit} className="flex flex-col  w-fit">
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_composer_1">ID composer_1</label>
                <input
                  type="text"
                  {...register("id_composer_1")}
                  className="input-form"
                />
              </div>
            )}
            <div className="container-input">
              <label htmlFor="annee_universitaire">Année universitaire</label>
              <input
                type="text"
                {...register("annee_universitaire_1")}
                placeholder="AAAA-AAAA"
                className="input-form"
              />
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="id_ue">ID unité d'enseignement</label>
              <select {...register("id_ue")} className="select-form">
                <option value="">Sélectionnez un unité d'enseignement</option>
                {unite_enseignements.map((unite_enseignement, index) => (
                  <option key={index} value={unite_enseignement.id_ue}>
                    {unite_enseignement.id_ue +
                      ": " +
                      unite_enseignement.designation_ue}
                  </option>
                ))}
              </select>
            </div>

            <div className="container-input">
              <label htmlFor="code_matiere">Code matière</label>
              <select {...register("code_matiere")} className="select-form">
                <option value="">Sélectionnez un matière</option>
                {matieres.map((matiere, index) => (
                  <option key={index} value={matiere.code_matiere}>
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </option>
                ))}
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
          {`${
            isUpdate ? "Valider les modifications" : "Ajouter la composition"
          }`}
        </button>
        <Link href={"/composition/composition_1"}>Annuler</Link>
      </form>
    </div>
  );
}

export default Composition1_Form;
