import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// yearデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const years = await prisma.year.findMany();
    res.status(200).json(years);
  } catch (error) {
    console.error(error);
  }
});

// yearデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const year = await prisma.year.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(year);
  } catch (error) {
    console.error(error);
  }
});

export default router;
