import NavbarTopNote from "@/components/note/NavbarTopNote";
import React from "react";

function LayoutNote({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full relative">
      <NavbarTopNote />
      <div className="h-full">{children}</div>
    </section>
  );
}

export default LayoutNote;
