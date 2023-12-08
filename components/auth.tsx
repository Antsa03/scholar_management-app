"use client";
import { signIn, signOut } from "next-auth/react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoginButton = () => {
  return (
    <button className="" onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="flex text-sm tracking-wider flex-row items-center justify-center gap-2 h-[40px] w-[160px] text-custom-red bg-custom-red-light  hover:bg-red-100 shadow-sm rounded-md text-center border-[1px] border-custom-red"
      onClick={() => signOut()}
    >
      <div>
        <FontAwesomeIcon
          fontSize={14}
          icon={faSignOut}
          fontWeight={16}
        ></FontAwesomeIcon>
      </div>
      Se déconnecter
    </button>
  );
};
