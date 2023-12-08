import Admin from "@/models/utilisateur/Admin";
import { faPlus, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface AdminFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Admin>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AdminForm({ isUpdate, register, handleSubmit }: AdminFormProps) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-fit">
        <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2  mb-6 border-transparent  rounded-custom shadow-custom w-fit">
          <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
            <FontAwesomeIcon
              icon={faUserShield}
              fontSize={16}
              className="text-gray-700 "
            />
            Administrateur
          </h2>
          <hr className="border-t-1 border-dotted border-black mb-[36px]" />
          <div className="container-col-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_admin" className="text-gray-700 text-sm">
                  Id administrateur
                </label>
                <input
                  type="text"
                  {...register("id_admin")}
                  className="input-form w-[340px] h-[40px]"
                />
              </div>
            )}
            <div className="container-input">
              <label htmlFor="fonction" className="text-gray-700 text-sm">
                Fonction de l'administrateur
              </label>
              <input
                type="text"
                {...register("fonction")}
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
          {`${
            isUpdate ? "Modifier l'administrateur" : "Ajouter l'administrateur"
          }`}
        </button>
      </form>
    </div>
  );
}

export default AdminForm;
