import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const router = express.Router();

// portfolioデータを新規で作成
router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    description,
    url,
    userID,
  }: { name: string; description: string; url: string; userID: number } =
    req.body;
  try {
    const newportfolio = await prisma.portfolio.create({
      data: {
        name: name,
        description: description,
        url: url,
        userID: userID,
      },
    });
    res.status(200).json(newportfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send("新規経験を追加できませんでした");
  }
});

// portfolioデータの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const portfolios = await prisma.portfolio.findMany();
    res.status(200).json(portfolios);
  } catch (error) {
    console.error(error);
  }
});

// portfolioデータをuseridで取得
router.get("/:userid", async (req: Request, res: Response) => {
  const userid = Number(req.params.userid);
  try {
    const portfolio = await prisma.portfolio.findMany({
      where: {
        userID: userid,
      },
      include: {
        image: true, // Portfolioに関連するPortfolioImageを取得
      },
    });
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
  }
});

// portfolioデータをidで取得
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: id,
      },
      include: {
        image: true, //portfolioに関連するportfolioImageを取得
      },
    });
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
  }
});

// portfolioデータを更新
router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    name,
    description,
    url,
    userID,
  }: { name: string; description: string; url: string; userID: number } =
    req.body;
  try {
    const updatedportfolio = await prisma.portfolio.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        url: url,
        userID: userID,
      },
    });
    res.status(200).json(updatedportfolio);
  } catch (error) {
    console.error(error);
  }
});

// portfolioデータを削除
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.portfolio.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send("portfolioデータを削除しました");
  } catch (error) {
    console.error(error);
  }
});

export default router;
