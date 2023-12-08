import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    const prisma = new PrismaClient();

    try {
        const utilisateurProps = req.body;
        const utilisateur = await prisma.utilisateur.create({
            data: {
                id_utilisateur: utilisateurProps.id_utilisateur,
                photo_profil: utilisateurProps.photo_profil,
                nom: utilisateurProps.nom.toUpperCase(),
                prenoms: utilisateurProps.prenoms,
                sexe: utilisateurProps.sexe,
                adresse: utilisateurProps.adresse,
                telephone: utilisateurProps.telephone,
                email: utilisateurProps.email,
                mot_de_passe: utilisateurProps.mot_de_passe
            }
        });
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json(error);
    }
}