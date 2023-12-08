import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Calendrier_3_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_3>;
}

function Calendrier_3_Form({ isUpdate, register }: Calendrier_3_FormProps) {
  return (
    <form className="container-row-div-input">
      {!isUpdate && (
        <div className="container-input">
          <label htmlFor="id_calendrier_3">ID calendrier_3</label>
          <input
            type="text"
            {...register("id_calendrier_3")}
            className="input-form"
          />
        </div>
      )}
      <div className="flex flex-row gap-[8px] w-[340px]">
        <div className="container-input">
          <label htmlFor="date_deb_abs">
            Date <p className="text-sm inline">(début d'absence)</p>
          </label>
          <input
            type="date"
            {...register("date_deb_abs")}
            className="input-form w-[160px] h-[40px]"
          />
        </div>
        <div className="container-input">
          <label htmlFor="heure_deb_abs">
            Heure <p className="text-sm inline">(début d'absence)</p>
          </label>
          <input
            type="time"
            {...register("heure_deb_abs")}
            className="input-form w-[160px] h-[40px]"
          />
        </div>
      </div>
    </form>
  );
}

export default Calendrier_3_Form;
