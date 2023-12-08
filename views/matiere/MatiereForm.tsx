import Matiere from "@/models/enseignement/Matiere";
import Enseignant from "@/models/utilisateur/listage/Enseignant";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface MatiereFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Matiere>;
  enseignants: Enseignant[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function MatiereForm({
  isUpdate,
  register,
  enseignants,
  handleSubmit,
}: MatiereFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout de matière
      </h1>
      <h2 className="h2">Ajouter un un nouveau matière</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-fit">
        <div className="flex flex-col">
          <div className="flex flex-row gap-12  w-fit">
            <div className="container-col-div-input">
              {!isUpdate && (
                <div className="container-input">
                  <label htmlFor="code_matiere">Code matière</label>
                  <input
                    type="text"
                    {...register("code_matiere")}
                    className="input-form w-[340px] h-[40px]"
                  />
                </div>
              )}
              <div className="container-input">
                <label htmlFor="coeff">Coefficient </label>
                <input
                  type="text"
                  {...register("coeff")}
                  className="input-form w-[340px] h-[40px]"
                />
              </div>
            </div>

            <div className="container-col-div-input">
              <div className="container-input">
                <label htmlFor="designation_matiere">
                  Désignation matière{" "}
                </label>
                <input
                  type="text"
                  {...register("designation_matiere")}
                  className="input-form w-[340px] h-[40px]"
                />
              </div>
              <div className="container-input">
                <label htmlFor="v_horaire_matiere">Volume horaire </label>
                <input
                  type="number"
                  {...register("v_horaire_matiere")}
                  className="input-form w-[340px] h-[40px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="description">Description </label>
            <textarea
              {...register("description")}
              cols={50}
              rows={10}
              className="input-form  max-w-[728px] max-h-[80px] w-full"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 relative mt-6">
            <select
              {...register("id_enseignant")}
              className=" rounded-md bg-white text-sm border-gray-700 border-[1px] px-2 h-[50px] focus:border-blue-500 focus:outline-none max-w-[728px] max-h-[80px] w-full"
            >
              <option value="">Séléctionner un ID enseignant </option>
              {enseignants.map((enseignant, index) => (
                <option value={enseignant.id_enseignant} key={index}>
                  {enseignant.id_enseignant +
                    ": " +
                    enseignant.nom +
                    " " +
                    enseignant.prenoms}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-12 w-fit mt-4 justify-between ml-auto">
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
                isUpdate ? "Valider les modifications" : "Ajouter la matière"
              }`}
            </button>
            <Link href={"/matiere"} className="button-cancel-form">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MatiereForm;
