import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_enseignant } = req.query;
        const enseignant = await prisma.enseignant.findUnique({
            where: { id_enseignant: id_enseignant?.toString() }
        });
        return res.status(200).json(enseignant);
    } catch (error) {
        return res.status(500).json(error);
    }
}