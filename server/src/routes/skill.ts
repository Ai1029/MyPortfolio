import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// skillデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    description,
    skilllevelID,
    userID,
  }: {
    name: string;
    description: string;
    skilllevelID: number;
    userID: number;
  } = req.body;
  try {
    const newskill = await prisma.skill.create({
      data: {
        name: name,
        description: description,
        skilllevelID: skilllevelID,
        userID: userID,
      },
    });
    res.status(200).json(newskill);
  } catch (error) {
    console.error(error);
    res.status(500).send("新規スキルを追加できませんでした");
  }
});

// skillデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
  }
});

// skillデータをuseridで取得
router.get("/:userid", async (req: Request, res: Response) => {
  const userid = Number(req.params.userid);
  try {
    const skill = await prisma.skill.findMany({
      where: {
        userID: userid,
      },
      include: {
        skilllevel: true,
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
    res.status(200).json(skill);
  } catch (error) {
    console.error(error);
  }
});

// skillデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const skill = await prisma.skill.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(skill);
  } catch (error) {
    console.error(error);
  }
});

// skillデータを更新
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    name,
    description,
    skilllevelID,
    userID,
  }: {
    name: string;
    description: string;
    skilllevelID: number;
    userID: number;
  } = req.body;
  try {
    const updatedskill = await prisma.skill.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        skilllevelID: skilllevelID,
        userID: userID,
      },
    });
    res.status(200).json(updatedskill);
  } catch (error) {
    console.error(error);
  }
});

// skillデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedskill = await prisma.skill.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("skillデータを削除しました");
  } catch (error) {
    console.error(error);
  }
});

export default router;
