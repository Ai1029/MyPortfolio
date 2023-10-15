import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = express.Router();

// サインアップ時にuserデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, uid, introduction, hobby } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        uid,
        introduction,
        hobby,
      },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("サーバーエラーが発生しました");
  }
});

// userデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

// userデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        image: true,
        skill: {
          include: {
            skilllevel: true,
          },
          orderBy: [
            {
              name: "asc",
            },
          ],
        },
        experience: {
          include: {
            experienceStartYear: true,
            experienceStartMonth: true,
            experienceFinishYear: true,
            experienceFinishMonth: true,
          },
          orderBy: [
            {
              experienceFinishYear: {
                year: "desc",
              },
            },
          ],
        },
        portfolio: {
          include: {
            image: true,
          },
        },
        sns: {
          include: {
            typeofSNS: true,
          },
        },
      },
    });
    res.json(user);
    if (!user) {
      return res.status(404).send("ユーザーは見つかりませんでした");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("サーバーエラーが発生しました");
  }
});

//　userデータを修正
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    name,
    email,
    password,
    introduction,
    hobby,
  }: {
    name: string;
    introduction: string;
    hobby: string;
    email: string;
    password: string;
  } = req.body;
  try {
    const updateduser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: password,
        introduction: introduction,
        hobby: hobby,
      },
    });
    return res.json(updateduser);
  } catch (err) {
    console.log(err);
  }
});

// userデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleteduser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.json("ユーザーを削除しました");
  } catch (err) {
    console.log(err);
  }
});

export default router;
