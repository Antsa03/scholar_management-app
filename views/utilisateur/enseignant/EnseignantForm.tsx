import Enseignant from "@/models/utilisateur/Enseignant";
import { faChalkboardTeacher, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface EnseignantFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Enseignant>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EnseignantForm({
  register,
  handleSubmit,
  isUpdate,
}: EnseignantFormProps) {
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2 mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            fontSize={16}
            className="text-gray-700 "
          />
          Enseignant
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input mb-5">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_enseignant" className="text-gray-700 text-sm">
                Id enseignant
              </label>
              <input
                type="text"
                {...register("id_enseignant")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="diplome" className="text-gray-700 text-sm">
              Diplôme
            </label>
            <input
              type="text"
              {...register("diplome")}
              className="input-form w-[340px] h-[40px]"
            />
          </div>
          <div className="container-input">
            <label htmlFor="grade" className="text-gray-700 text-sm">
              Grade
            </label>
            <input
              type="text"
              {...register("grade")}
              className="input-form w-[340px] h-[40px]"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="button-form-short flex flex-row gap-2 items-center self-end "
      >
        <FontAwesomeIcon
          className="text-gray-200"
          icon={faPlus}
          width={16}
          height={16}
        />
        {`${isUpdate ? "Valider les modifications" : "Ajouter l'enseignant"}`}
      </button>
    </form>
  );
}

export default EnseignantForm;
