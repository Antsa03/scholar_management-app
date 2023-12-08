import { Sublink } from "@/constants/sidebarData";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type SublinkProps = {
  sublink: Sublink[];
};

function Sublink({ sublink }: SublinkProps) {
  const pathname = usePathname();

  return (
    <ul className=" list-none h-auto pl-12 ">
      {sublink.map((sublink, key) => (
        <li
          key={key}
          className={`text-sm tracking-wide mb-1 hover:text-blue-500 transition duration-100 ease-out ${
            pathname === sublink.route ? "text-blue-500" : "font-normal"
          }`}
        >
          <Link href={sublink.route}>
            <div className=" block relative h-auto">{sublink.label}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sublink;
