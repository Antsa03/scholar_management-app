import Niveau from "@/models/pedagogie/Niveau";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface NiveauFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Niveau>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function NiveauForm({ isUpdate, register, handleSubmit }: NiveauFormProps) {
  return (
    <div>
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout de niveau
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit">
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_niveau">ID niveau</label>
              <input
                type="text"
                {...register("id_niveau")}
                className="input-form"
              />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="designation_niveau">Désignation du niveau</label>
            <input
              type="text"
              {...register("designation_niveau")}
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter niveau"}`}
          </button>
          <Link href={"/pedagogie"} className="button-cancel-form block">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NiveauForm;
