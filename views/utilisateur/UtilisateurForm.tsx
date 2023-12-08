import Utilisateur from "@/models/utilisateur/Utilisateur";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface UtilisateurFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Utilisateur>;
  file: any;
  setFile: Function;
}

function UtilisateurForm({
  isUpdate,
  register,
  file,
  setFile,
}: UtilisateurFormProps) {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="h2 mb-4">Information commun à tous les utilisateurs</h2>
        <form className="container-col-div-input">
          <div className="container-row-div-input ">
            <div className="flex flex-row gap-2 w-[340px] ">
              {!isUpdate && (
                <div className="container-input">
                  <label
                    htmlFor="id_utilisateur"
                    className="text-gray-700 text-sm"
                  >
                    Id utilisateur
                  </label>
                  <input
                    type="text"
                    {...register("id_utilisateur")}
                    className="input-form w-[120px] h-[40px] "
                  />
                </div>
              )}
              <div className="container-input">
                <label htmlFor="file" className="text-gray-700 text-sm">
                  Photo de profil
                </label>
                <label
                  htmlFor="file"
                  className="text-sm inline-block px-4 py-[10px]  cursor-pointer border-[1px] rounded-md  border-gray-700"
                >
                  {`${file ? file.name : "Parcourir........"}`}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    className="hidden"
                    placeholder="Parcourir"
                    multiple
                  />
                </label>
              </div>
            </div>
            <div className="container-input">
              <label htmlFor="telephone" className="text-gray-700 text-sm">
                Téléphone
              </label>
              <input
                type="text"
                {...register("telephone")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          </div>

          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="nom" className="text-gray-700 text-sm">
                Nom
              </label>
              <input
                type="text"
                {...register("nom")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
            <div className="container-input">
              <label htmlFor="prenoms" className="text-gray-700 text-sm">
                Prénom(s)
              </label>
              <input
                type="text"
                {...register("prenoms")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          </div>

          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="sexe" className="text-gray-700 text-sm">
                Sexe
              </label>
              <div className="flex flex-row text-[12px] gap-2">
                <span>Masculin</span>
                <input
                  type="radio"
                  className="mr-2"
                  value="Masculin"
                  {...register("sexe")}
                />
                <span>Féminin</span>
                <input
                  type="radio"
                  className="mr-2"
                  value="Féminin"
                  {...register("sexe")}
                />
              </div>
            </div>
            <div className="container-input">
              <label htmlFor="adresse" className="text-gray-700 text-sm">
                Adresse
              </label>
              <input
                type="text"
                {...register("adresse")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          </div>

          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
            <div className="container-input">
              <label htmlFor="mot_de_passe" className="text-gray-700 text-sm">
                Mot de passe
              </label>
              <input
                type="text"
                {...register("mot_de_passe")}
                className="input-form w-[340px] h-[40px]"
              />
            </div>
          </div>
        </form>
        <hr className="border-t-2 border-dotted border-black mt-[36px]" />
      </div>
    </div>
  );
}

export default UtilisateurForm;
