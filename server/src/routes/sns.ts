import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// snsデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  const {
    typeofSNSID,
    url,
    userID,
  }: { typeofSNSID: number; url: string; userID: number } = req.body;
  try {
    const newsns = await prisma.sNS.create({
      data: {
        typeofSNSID: typeofSNSID,
        url: url,
        userID: userID,
      },
    });
    res.status(200).json(newsns);
  } catch (error) {
    console.error(error);
    res.status(500).send("新規経験を追加できませんでした");
  }
});

// snsデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const snses = await prisma.sNS.findMany();
    res.status(200).json(snses);
  } catch (error) {
    console.error(error);
  }
});

// snsデータをuseridで取得
router.get("/:userid", async (req: Request, res: Response) => {
  const userid = Number(req.params.userid);
  try {
    const sns = await prisma.sNS.findMany({
      where: {
        userID: userid,
      },
      include: {
        typeofSNS: true,
      },
    });
    res.status(200).json(sns);
  } catch (error) {
    console.error(error);
  }
});

// snsデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const sns = await prisma.sNS.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(sns);
  } catch (error) {
    console.error(error);
  }
});

// snsデータを更新
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    typeofSNSID,
    url,
    userID,
  }: { typeofSNSID: number; url: string; userID: number } = req.body;
  try {
    const updatedsns = await prisma.sNS.update({
      where: {
        id: id,
      },
      data: {
        typeofSNSID: typeofSNSID,
        url: url,
        userID: userID,
      },
    });
    res.status(200).json(updatedsns);
  } catch (error) {
    console.error(error);
  }
});

// snsデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedsns = await prisma.sNS.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("snsデータを削除しました");
  } catch (error) {
    console.error(error);
  }
});

export default router;
