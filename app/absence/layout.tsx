import NavbarTopAbsence from "@/components/absence/navbarTopAbsence";
import React from "react";

function LayoutAbsence({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full  h-[1000px] relative overflow-hidden">
      <NavbarTopAbsence />
      <div className="">{children}</div>
    </section>
  );
}

export default LayoutAbsence;
