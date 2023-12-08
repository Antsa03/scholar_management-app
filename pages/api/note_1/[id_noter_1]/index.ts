import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_noter_1 } = req.query;
    const noter_1 = await prisma.noter_1.findUnique({
      where: { id_noter_1: id_noter_1?.toString() },
    });
    return res.status(200).json(noter_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}
