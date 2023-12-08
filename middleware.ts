import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      !req.nextUrl.pathname.startsWith("/etudiant") &&
      req.nextauth.token?.role !== "Administrateur"
    )
      return new NextResponse("Vous n'êtes pas autorisé");
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/accueil",
    "/utilisateur/:path*",
    "/enseignement/:path*",
    "/pedagogie/:path*",
    "/app/:path*",
    "/api/:path*",
  ],
};
