import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const {
    id,
    name,
    price,
    imageUrl,
    active,
    description,
    ingredients,
  } = req.body;
  try {
    const updateData = await prisma.food.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        price,
        imageUrl,
        active,
        description,
        ingredients,
      },
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating a food item." });
  }
};