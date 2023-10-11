import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// monthデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const months = await prisma.month.findMany({
      orderBy: {
        id: "asc", // IDの昇順でソート
      },
    });
    res.status(200).json(months);
  } catch (error) {
    console.error(error);
  }
});

// monthデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const month = await prisma.month.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(month);
  } catch (error) {
    console.error(error);
  }
});

export default router;
