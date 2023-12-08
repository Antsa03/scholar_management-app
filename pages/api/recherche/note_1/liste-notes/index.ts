import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

interface SearchProps {
  num_matricule: string;
  code_matiere: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { num_matricule, code_matiere }: SearchProps = req.body;
    const notes = await prisma.noter_1.findMany({
      where: {
        code_matiere: {
          contains: code_matiere,
        },
        num_matricule: {
          contains: num_matricule,
        },
      },
    });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json(error);
  }
}
