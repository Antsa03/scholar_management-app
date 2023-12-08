import Calendrier_2 from "@/models/note_1/Calendrier_2";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface Calendrier2FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_2>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Calendrier_2_Form({
  isUpdate,
  register,
  handleSubmit,
}: Calendrier2FormProps) {
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Formulaire d'ajout calendrier_2
      </h1>
      <h2 className="h2">Ajouter un calendrier pour une année universitaire</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit">
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_calendrier">ID calendrier</label>
                <input
                  type="text"
                  {...register("id_calendrier_2")}
                  className="input-form"
                />
              </div>
            )}
            <div className="container-input">
              <label htmlFor="annee_universitaire_2">Année universitaire</label>
              <input
                type="text"
                {...register("annee_universitaire_2")}
                placeholder="AAAA - AAAA"
                className="input-form"
              />
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="semestre">Semestre</label>
              <input
                type="text"
                {...register("semestre")}
                className="input-form"
              />
            </div>
            <div className="container-input">
              <label htmlFor="session">Session</label>
              <input
                type="text"
                {...register("session")}
                className="input-form"
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
          {`${isUpdate ? "Valider les modifications" : "Ajouter calendire_2"}`}
        </button>
      </form>
    </div>
  );
}

export default Calendrier_2_Form;
