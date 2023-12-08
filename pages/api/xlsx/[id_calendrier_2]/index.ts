import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllNote2 } from "@/utils/releveNoteFunction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_2 } = req.query;
    if (typeof id_calendrier_2 === "string") {
      const response = await fetchAllNote2(id_calendrier_2);
      return res.status(200).json(response);
    } else return res.status(401).json("Année universitaire invalide");
  } catch (error) {
    console.error(error);
  }
}
