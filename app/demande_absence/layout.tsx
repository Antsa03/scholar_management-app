import NavbarTopDemandeAbsence from "@/components/demande_absence/navbarTopDemandeAbsence";
import React from "react";

function LayoutDemandeAbsence({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full  h-[1000px] relative overflow-hidden">
      <NavbarTopDemandeAbsence />
      <div className="">{children}</div>
    </section>
  );
}

export default LayoutDemandeAbsence;
