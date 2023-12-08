"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { faDashboard, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import SidebarListItem from "@/components/sidebar/sidebarListItem";
import Image from "next/image";
import { AlignLeft } from "react-feather";

function Sidebar() {
  const { data: session }: any = useSession();

  if (session)
    return (
      <div className="bg-custom-primary-white border-transparent border-2 flex flex-col gap-4 w-[316px] sticky top-0 left-0 px-4 h-screen">
        <div className="flex flex-col items-center justify-center px-6  w-[280px] h-[72px] ">
          <Image
            src="/img/logo.png"
            alt="Logo de l'Esti"
            width={60}
            height={40}
          />
          <h1 className="font-poppins-regular uppercase text-orange-400 font-medium  tracking-wider">
            Scholar Management
          </h1>
        </div>
        <button className="flex text-gray-800 flex-row tracking-wider capitalize text-xl  items-center px-6  gap-4 w-full h-[40px] bg-blue-200 hover:bg-blue-300 rounded-sm transition duration-300 ease-out">
          <div>
            <AlignLeft fontSize={16} />
          </div>
          Acceuil
        </button>
        {/* <div className="flex flex-col gap-4">
          <div className="w-full h-[3px] bg-blue-500"></div>
        </div> */}
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-sm tracking-wide text-gray-600">Pages</h2>
          <SidebarListItem></SidebarListItem>
        </div>
        {/* <div className="w-[100px] m-4 bg-white/70 border-transparent border-2 h-[200px] rounded-custom shadow-custom"> <h1>Coucou</h1><p>Hzelloooo</p></div> */}
      </div>
    );
}

export default Sidebar;
