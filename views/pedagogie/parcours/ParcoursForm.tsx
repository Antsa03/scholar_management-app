import Parcours from "@/models/pedagogie/Parcours";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface ParcoursFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Parcours>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function ParcoursForm({ isUpdate, register, handleSubmit }: ParcoursFormProps) {
  return (
    <div>
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout de parcours
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit">
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_parcours">ID parcours</label>
              <input
                type="text"
                {...register("id_parcours")}
                className="input-form"
              />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="designation_parcours">Désignation parcours</label>
            <input
              type="text"
              {...register("designation_parcours")}
              className="input-form"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-start"
          >
            <FontAwesomeIcon
              className="text-gray-200"
              icon={faPlus}
              width={16}
              height={16}
            />
            {`${isUpdate ? "Valider les modifications" : "Ajouter parcours"}`}
          </button>
          <Link href={"/pedagogie"} className="button-cancel-form">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ParcoursForm;
