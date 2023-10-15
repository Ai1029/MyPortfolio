import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// experienceデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const {
    name,
    description,
    company,
    experiencecategoryID,
    startyearID,
    startmonthID,
    finishyearID,
    finishmonthID,
    userID,
  }: {
    name: string;
    description: string;
    company: string;
    experiencecategoryID: number;
    startyearID: number;
    startmonthID: number;
    finishyearID: number;
    finishmonthID: number;
    userID: number;
  } = req.body;
  try {
    const newexperience = await prisma.experience.create({
      data: {
        name: name,
        description: description,
        company: company,
        experiencecategoryID: experiencecategoryID,
        startyearID: startyearID,
        startmonthID: startmonthID,
        finishyearID: finishyearID,
        finishmonthID: finishmonthID,
        userID: userID,
      },
    });
    res.status(200).json(newexperience);
  } catch (error) {
    console.error(error);
    res.status(500).send("新規経験を追加できませんでした");
  }
});

// experienceデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
  }
});

// experienceデータをuseridで取得
router.get("/:userid", async (req: Request, res: Response) => {
  const userid = Number(req.params.userid);
  try {
    const experience = await prisma.experience.findMany({
      where: {
        userID: userid,
      },
      // include: {
      //   experienceStartYear: true,
      //   experienceStartMonth: true,
      //   experienceFinishYear: true,
      //   experienceFinishMonth: true,
      // },
      // orderBy: [
      //   {
      //     experienceFinishYear: {
      //       year: "desc",
      //     },
      //   },
      // ],
    });
    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
  }
});

// experienceデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
  }
});

// experienceデータを更新
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    name,
    description,
    company,
    experiencecategoryID,
    startyearID,
    startmonthID,
    finishyearID,
    finishmonthID,
    userID,
  }: {
    name: string;
    description: string;
    company: string;
    experiencecategoryID: number;
    startyearID: number;
    startmonthID: number;
    finishyearID: number;
    finishmonthID: number;
    userID: number;
  } = req.body;
  try {
    const updatedexperience = await prisma.experience.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        company: company,
        experiencecategoryID: experiencecategoryID,
        startyearID: startyearID,
        startmonthID: startmonthID,
        finishyearID: finishyearID,
        finishmonthID: finishmonthID,
        userID: userID,
      },
    });
    res.status(200).json(updatedexperience);
  } catch (error) {
    console.error(error);
  }
});

// experienceデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedexperience = await prisma.experience.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("経験データを削除しました");
  } catch (error) {
    console.error(error);
  }
});

export default router;
