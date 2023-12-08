import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const utilisateur = await prisma.utilisateur.upsert({
    where: { email: "admindefault@gmail.com" },
    update: {},
    create: {
      id_utilisateur: "999A",
      photo_profil: "user.png",
      nom: "Utilisateur",
      prenoms: "Admin",
      sexe: "Masculin",
      adresse: "Adresse",
      telephone: "+2613400000000",
      email: "rajo@gmail.com",
      mot_de_passe: "rajo",
    },
  });
  if (utilisateur) {
    const admin = await prisma.admin.create({
      data: {
        id_admin: "rajo",
        fonction: "Par défaut",
        id_utilisateur: "999A",
      },
    });
  }
  console.log(utilisateur);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
