"use client";
import { NavbarTopNoteDatas } from "@/constants/navbarTopNote";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

function NavbarTopNote() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row  items-center h-14 w-full py-2 mb-2">
      <img
        src="/img/star-dynamic-gradient.png"
        alt="image star"
        width={40}
        height={40}
        className="mr-4"
      />
      {NavbarTopNoteDatas.map((item, index) => (
        <Fragment key={index}>
          <div className="mx-2">
            <div className=" w-fit h-fit mr-8">
              <div className="flex justify-center ">
                <Link
                  href={item.route}
                  className={`block w-[80%] text-center text-base tracking-wider whitespace-nowrap ${
                    pathname == item.route ? "text-blue-600 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </div>

              <div
                className={`mt-1 rounded-t h-[4px] ${
                  pathname == item.route
                    ? "w-[120%]  bg-blue-500/90 blur-md"
                    : "bg-blue-500/10"
                }}`}
              ></div>
            </div>
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

export default NavbarTopNote;
