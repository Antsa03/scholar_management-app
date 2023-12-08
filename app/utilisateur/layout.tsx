import React from "react";
import NavbarTopUtilisateur from "@/components/utilisateur/navbarTopUtilisateur";

function UtilisateurLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full h-[1000px] relative">
      <NavbarTopUtilisateur />
      <div className="">{children}</div>
    </section>
  );
}

export default UtilisateurLayout;
