import NavbarTopUe from "@/components/unite_enseignement/navbarTopUe";
import React from "react";

function UeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full  h-[1000px] relative overflow-hidden">
      <NavbarTopUe />
      <div className="">{children}</div>
    </section>
  );
}

export default UeLayout;
