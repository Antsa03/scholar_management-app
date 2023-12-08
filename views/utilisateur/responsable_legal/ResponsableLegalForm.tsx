import Responsable_legal from "@/models/utilisateur/Responsable_legal";
import { faPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface ResponsableLegalFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Responsable_legal>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function ResponsableLegalForm({
  isUpdate,
  register,
  handleSubmit,
}: ResponsableLegalFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2 mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faUserTie}
            fontSize={16}
            className="text-gray-700 "
          />
          Responsable légale
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label
                htmlFor="id_responsable_legale"
                className="text-gray-700 text-sm"
              >
                Id responsable
              </label>
              <input type="text" {...register("id_responsable_legal")} />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="profession" className="text-gray-700 text-sm">
              Profession
            </label>
            <input
              type="text"
              {...register("profession")}
              className="input-form w-[340px] h-[40px]"
            />
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
        {isUpdate ? "Valider les modifications" : "Ajouter responsable légale"}
      </button>
    </form>
  );
}

export default ResponsableLegalForm;
