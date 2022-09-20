import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deleteData = await prisma.food.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(403).json({ err: "Error occured while deleting a food item." });
  }
};
