import Calendrier_4 from "@/models/absence/enseignant/Calendrier_4";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Calendrier_4_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_4>;
}

function Calendrier_4_Form({ isUpdate, register }: Calendrier_4_FormProps) {
  return (
    <form className="container-row-div-input">
      {!isUpdate && (
        <div className="container-input">
          <label htmlFor="id_calendrier_4">ID calendrier_4</label>
          <input
            type="text"
            {...register("id_calendrier_4")}
            className="input-form"
          />
        </div>
      )}

      <div className="flex flex-row gap-[8px] w-[340px]">
        <div className="container-input">
          <label htmlFor="date_deb_abs_ens" className="text-md">
            Date <p className="text-sm inline">(début d'absence)</p>
          </label>
          <input
            type="date"
            {...register("date_deb_abs_ens")}
            className="input-form w-[160px] h-[40px]"
          />
        </div>
        <div className="container-input">
          <label htmlFor="heure_deb_abs_ens">
            Heure <p className="text-sm inline">(début d'absence)</p>
          </label>
          <input
            type="time"
            {...register("heure_deb_abs_ens")}
            className="input-form w-[160px] h-[40px]"
          />
        </div>
      </div>
    </form>
  );
}

export default Calendrier_4_Form;
