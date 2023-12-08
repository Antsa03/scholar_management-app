"use client";
import NavbarTopMatiere from "@/components/matiere/navbarTopMatiere";
import React from "react";

function LayoutMatiere({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full min-h-[1000px] relative">
      <NavbarTopMatiere />
      <div className="">{children}</div>
    </section>
  );
}

export default LayoutMatiere;
