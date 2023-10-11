import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// skilllevelデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const typeofSNSs = await prisma.typeofSNS.findMany();
    res.status(200).json(typeofSNSs);
  } catch (error) {
    console.error(error);
  }
});

// skilllevelデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const typeofSNS = await prisma.typeofSNS.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(typeofSNS);
  } catch (error) {
    console.error(error);
  }
});

export default router;
