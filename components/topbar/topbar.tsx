"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Bell, Flag, MessageCircle } from "react-feather";

function TopbarContainer() {
  const { data: session }: any = useSession();

  //DARK MODE AND LIGHT MODE
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      // Add code here to enable dark mode
    } else {
      setTheme("light");
      // Add code here to enable light mode
    }
  };

  if (session)
    return (
      <div className="flex flex-row items-center justify-between gap-4 py-4 shadow-md pl-12 pr-4 h-[72px]">
        <div className="flex flex-row gap-4  items-center w-auto rounded- relative">
          <Image
            src={`/img/photo_profil/${session?.user.image}`}
            alt="Image de profil"
            className="rounded-full h-full"
            width={54}
            height={54}
          />
          <div className="flex flex-col gap-[2px]">
            <span className="text-md font-semibold font-poppins-regular tracking-wide">
              {session?.user.name}
            </span>
            <span className="text-sm tracking-wide">
              Status :
              <span className="text-[#24A8AF]  font-medium tracking-wider bg-[#EEF8F9] px-4 p-[2px] rounded-md">
                {session?.user.role}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="flex flex-row items-center bg-custom-blue-light  text-base gap-2 rounded-md px-4 h-[40px] w-auto">
            Notifications :
            <div className="flex flex-row justify-start items-center gap-4 w-auto self-center">
              <MessageCircle size={24} strokeWidth={2} color="#257DB0" />
              <Bell size={24} strokeWidth={2} color="#257DB0" />
              <Flag size={24} strokeWidth={2} color="#257DB0" />
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="flex flex-row text-sm gap-2 items-center justify-center border border-black px-4 py-2 h-[40px]  rounded"
          >
            {theme === "light" ? (
              <>
                <FontAwesomeIcon
                  icon={faMoon}
                  className="text-gray-800 text-md"
                />{" "}
                Mode sombre
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faSun}
                  className="text-gray-800 text-md"
                />{" "}
                Mode clair
              </>
            )}
          </button>
          <LogoutButton />
        </div>
      </div>
    );
}

export default TopbarContainer;
