import Composer_2 from "@/models/composition/Composer_2";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Parcours from "@/models/pedagogie/Parcours";
import React from "react";
import Link from "next/link";
import { ChevronsRight } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UseFormRegister } from "react-hook-form";

interface Composition2_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_2>;
  parcours: Parcours[];
  unite_enseignements: Unite_enseignement[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Composition2_Form({
  isUpdate,
  register,
  parcours,
  unite_enseignements,
  handleSubmit,
}: Composition2_FormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout composition_2
      </h1>
      <h2 className="h2">Ajouter de composition_2</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit">
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_composer_2">ID composer_2</label>
              <input
                type="text"
                {...register("id_composer_2")}
                className="input-form"
              />
            </div>
          )}
          <div className="container-input mb-2">
            {" "}
            <label htmlFor="id_parcours">ID parcours</label>
            <select {...register("id_parcours")} className="select-form">
              <option value="">Sélectionnez un parcours</option>
              {parcours.map((parcours, index) => (
                <option key={index} value={parcours.id_parcours}>
                  {parcours.id_parcours + ": " + parcours.designation_parcours}
                </option>
              ))}
            </select>
          </div>

          <div className="container-input">
            {" "}
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
        </div>

        <div className="flex flex-row justify-between">
          {" "}
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center"
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
          <Link
            href={"/composition/composition_2"}
            className="button-cancel-form"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Composition2_Form;
