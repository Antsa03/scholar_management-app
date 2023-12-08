import NavbarTopPedagogie from "@/components/pedagogie/navbarTopPedagogie";
import React from "react";
function LayoutPedagogie({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full  h-[1000px] relative overflow-hidden">
      <NavbarTopPedagogie />
      <div className="">{children}</div>
    </section>
  );
}

export default LayoutPedagogie;
