import Relation from "@/models/utilisateur/Relation";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import Image from "next/image";
import React from "react";
import Laptop from "../../../public/img/laptop_1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight } from "react-feather";
import { UseFormRegister } from "react-hook-form";

interface RelationFormProps {
  register: UseFormRegister<Relation>;
  responsable_legals: Responsable_legal[];
  etudiants: Etudiant[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isUpdate: boolean;
}

function RelationForm({
  isUpdate,
  register,
  responsable_legals,
  etudiants,
  onSubmit,
}: RelationFormProps) {
  return (
    <div className="flex flex-col gap-4 relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        {`${
          isUpdate
            ? "Modification de relation parentale"
            : "Ajouter une relation parentale"
        }`}
      </h1>
      <Image
        src={Laptop}
        alt="image"
        width={600}
        className="absolute top-1/6 left-1/2"
      ></Image>
      <p>
        L'ID relation permet d'identifier de manière unique la relation
        parentale.
      </p>
      <form
        onSubmit={onSubmit}
        className="px-12 py-6 bg-white/70 border-2 my-4 border-transparent  rounded-custom shadow-custom w-fit"
      >
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faUserShield}
            fontSize={16}
            className="text-gray-700 "
          />{" "}
          {`${
            isUpdate
              ? "Modifier la relation parentale"
              : "Ajouter une relation parentale"
          }`}
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input mb-5">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_relation" className="text-gray-700 text-sm">
                ID relation
              </label>
              <input
                type="text"
                {...register("id_relation")}
                className="input-form w-[340px] h-[40px] "
              />{" "}
            </div>
          )}
          <div className="container-input mt-3">
            <select
              {...register("id_responsable_legal")}
              className="select-form  focus:border-blue-500 focus:outline-none"
            >
              <option value="">Séléctionner un ID responsable légal</option>
              {responsable_legals.map((responsable_legal, index) => (
                <option
                  key={index}
                  value={responsable_legal.id_reponsable_legal}
                >
                  {responsable_legal.id_reponsable_legal +
                    ": " +
                    responsable_legal.nom +
                    " " +
                    responsable_legal.prenoms}
                </option>
              ))}
            </select>{" "}
            <div className="container-input my-3">
              <select
                {...register("num_matricule")}
                className="select-form focus:border-blue-500 focus:outline-none"
              >
                <option value="" className="bg-white">
                  Sélectionnez N° matricule
                </option>
                {etudiants.map((etudiant, index) => (
                  <option
                    key={index}
                    value={etudiant.num_matricule}
                    className="bg-white appearance-none"
                  >
                    {etudiant.num_matricule +
                      ": " +
                      etudiant.nom +
                      " " +
                      etudiant.prenoms}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter"}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RelationForm;
