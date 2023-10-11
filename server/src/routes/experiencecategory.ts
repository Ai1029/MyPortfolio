import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// experienceCategoryデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const experienceCategorys = await prisma.experienceCategory.findMany();
    res.status(200).json(experienceCategorys);
  } catch (error) {
    console.error(error);
  }
});

// experienceCategoryデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const experienceCategory = await prisma.experienceCategory.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(experienceCategory);
  } catch (error) {
    console.error(error);
  }
});

export default router;
