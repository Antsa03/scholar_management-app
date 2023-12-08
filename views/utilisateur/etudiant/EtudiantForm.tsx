import Etudiant from "@/models/utilisateur/Etudiant";
import {
  faGraduationCap,
  faPlus,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface EtudiantFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Etudiant>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EtudiantForm({ isUpdate, register, handleSubmit }: EtudiantFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col px-12 pt-4 pb-6 bg-white/70 border-2  mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faGraduationCap}
            fontSize={16}
            className="text-gray-700 "
          />
          Etudiant
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />

        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="num_matricule" className="text-gray-700 text-sm">
                N° matricule
              </label>
              <input
                type="text"
                {...register("num_matricule")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          )}
          <div className="container-input">
            <label htmlFor="date_naissance" className="text-gray-700 text-sm">
              Date de naissance
            </label>
            <input
              type="date"
              {...register("date_naissance")}
              className="input-form w-[340px] h-[40px]"
            />
          </div>
          <div className="container-input">
            <label htmlFor="nationalite" className="text-gray-700 text-sm">
              Nationalité
            </label>
            <input
              type="text"
              {...register("nationalite")}
              className="input-form w-[340px] h-[40px]"
            />
          </div>
          <div className="container-input">
            <label htmlFor="lieu_naissance " className="text-gray-700 text-sm">
              Lieu de naissance
            </label>
            <input
              type="texte"
              {...register("lieu_naissance")}
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
        {`${isUpdate ? "Valider les modifications" : "Ajouter l'étudiant"}`}
      </button>
    </form>
  );
}

export default EtudiantForm;
