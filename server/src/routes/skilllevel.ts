import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// skilllevelデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const skilllevels = await prisma.skillLevel.findMany();
    res.status(200).json(skilllevels);
  } catch (error) {
    console.error(error);
  }
});

// skilllevelデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const skilllevel = await prisma.skillLevel.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(skilllevel);
  } catch (error) {
    console.error(error);
  }
});

export default router;
