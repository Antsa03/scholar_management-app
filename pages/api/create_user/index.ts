import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Utilisateur from "@/models/utilisateur/Utilisateur";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const utilisateurs = req.body;
  const createPromises = utilisateurs.map((utilisateur: Utilisateur) => {
    return prisma.utilisateur.create({
      data: utilisateur,
    });
  });
  try {
    await prisma.$transaction(createPromises);
    return res.status(200).json("Tous les utilisateurs sont créés");
  } catch (error) {
    console.error(error);
  }
}
