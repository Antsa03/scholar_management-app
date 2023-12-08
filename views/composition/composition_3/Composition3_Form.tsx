import Composer_3 from "@/models/composition/Composer_3";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import React from "react";
import Link from "next/link";
import { ChevronsRight } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UseFormRegister } from "react-hook-form";

interface Composition3_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_3>;
  niveaux: Niveau[];
  parcours: Parcours[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Composition3_Form({
  isUpdate,
  register,
  niveaux,
  parcours,
  handleSubmit,
}: Composition3_FormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout composition_3
      </h1>
      <h2 className="h2">Ajouter des composition_3</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit">
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_composer_3">ID composition 3</label>
              <input
                type="text"
                {...register("id_composer_3")}
                className="input-form"
              />{" "}
            </div>
          )}
          <div className="container-input mb-2">
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
            <label htmlFor="id_niveau">ID niveau</label>
            <select {...register("id_niveau")} className="select-form">
              <option value="">Sélectionnez un niveau</option>
              {niveaux.map((niveau, index) => (
                <option key={index} value={niveau.id_niveau}>
                  {niveau.id_niveau + ": " + niveau.designation_niveau}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-end"
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
          <button className="button-cancel-form">
            <Link href={"/composition/composition_3"}>Annuler</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Composition3_Form;
