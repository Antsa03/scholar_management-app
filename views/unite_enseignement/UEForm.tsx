import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

type UEFormProps = {
  isUpdate: boolean;
  register: UseFormRegister<Unite_enseignement>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function UEForm({ isUpdate, register, handleSubmit }: UEFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout d'unité d'enseignement
      </h1>
      <h2 className="h2">Ajouter des composition_1</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit gap-1">
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_ue">ID unité d'enseignement</label>
              <input
                type="text"
                placeholder="id_ue"
                {...register("id_ue")}
                className="input-form"
              />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="crédit">Crédit</label>
            <input
              type="number"
              placeholder="credit"
              {...register("credit")}
              className="input-form"
            />{" "}
          </div>
          <div className="container-input">
            {" "}
            <label htmlFor="designation_ue">
              Désignation d'unité d'enseignement
            </label>
            <input
              type="text"
              placeholder="designation_ue"
              {...register("designation_ue")}
              className="input-form"
            />{" "}
          </div>

          <div className="container-input">
            {" "}
            <label htmlFor="semestre_ue">
              Semestre de l'unité d'enseignement
            </label>
            <input
              type="text"
              placeholder="semestre_ue"
              {...register("semestre_ue")}
              className="input-form"
            />{" "}
          </div>

          <div className="flex flex-row justify-between mt-2">
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
              {`${isUpdate ? "Valider les modifications" : "Ajouter l'UE"}`}
            </button>
            <Link href={"/unite_enseignement"} className="button-cancel-form">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UEForm;
