import NavbarTopComposition from "@/components/composition/navbarTopComposition";
import React from "react";

function LayoutComposition({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full h-[1000px]">
      <NavbarTopComposition />
      <div className="">{children}</div>
    </section>
  );
}

export default LayoutComposition;
