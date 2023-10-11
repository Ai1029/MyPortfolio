import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.AWS_BUCKET_NAME;

//　型を指定する
type CustomFile = Express.MulterS3.File;

// S3にファイルアップロードする関数
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName!,
    //　ファイルのメタデータ
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    //　ファイル名
    key: function (req, file, cb) {
      cb(
        null,
        `portfolioimg/` + Date.now().toString() + "-" + file.originalname
      );
    },
  }),
  limits: { fileSize: 6000000 }, // In bytes: 6000000 bytes = 6 MB
});

// portfolio画像を新規作成
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("ファイルがアップロードされていません");
  }
  console.log("S3にアップロード成功");
  const file = req.file;
  console.log("file", file);

  const imageUrl = (req.file as CustomFile).location;
  const imageName = (req.file as CustomFile).key;
  const portfolioID = Number(req.body.portfolioID);

  // MySQLに画像のURLを保存
  try {
    const saveImage = await prisma.portfolioImage.create({
      data: {
        name: imageName,
        url: imageUrl,
        portfolioID: portfolioID, // 画像とポートフォリオIDを関連付け
      },
    });
    console.log("画像URLがMySQLに保存されました");
    res.status(200).json({
      message: "画像がアップロードされ、URLが保存されました",
      saveImage: saveImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("エラーが発生しました");
  }
});

// portfolio画像を新しい画像に置き換え（postの前にdeleteを実行する）
router.post(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("ファイルがアップロードされていません");
    }
    console.log("S3にアップロード成功");

    try {
      // リクエストから必要な情報を取得
      const portfolioID = Number(req.body.portfolioID);
      console.log("portfolioID", portfolioID);
      console.log("ポートフォリオIDをゲット");
      const file = req.file;

      // リクエスト画像が存在する場合
      if (file) {
        // S3に保存した内容を取得
        const imageUrl = (req.file as CustomFile).location;
        const imageName = (req.file as CustomFile).key;

        // リクエストで送られてきた画像をMySQLに保存
        const newImage = await prisma.portfolioImage.create({
          data: {
            name: imageName,
            url: imageUrl,
            portfolioID: portfolioID, // 画像とportfolioIDを関連付け
          },
        });
        res.status(200).json({
          message: "新しい画像がアップロードされ、URLが保存されました",
          newImage: newImage,
        });
      } else {
        res.status(400).send("ファイルがアップロードされていません");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("エラーが発生しました");
    }
  }
);

// 画像データの一覧を取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const portfolioimages = await prisma.portfolioImage.findMany();
    res.json(portfolioimages);
  } catch (err) {
    console.log(err);
  }
});

//　portfolioIDから画像を取得
router.get("/:portfolioID", async (req: Request, res: Response) => {
  try {
    const portfolioID = Number(req.params.portfolioID);
    console.log("portfolioID", portfolioID);

    //　データベースから該当ユーザーの画像データを取得
    const image = await prisma.portfolioImage.findUnique({
      where: { portfolioID: portfolioID },
    });

    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).send("画像が見つかりません");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("エラーが発生しました");
  }
});

// portfolioIDから画像データを削除（portfolioが削除されると画像も削除されるように設定したが、念の為作成）
router.delete("/:portfolioID", async (req: Request, res: Response) => {
  const portfolioID = Number(req.params.portfolioID);
  try {
    // MySQLからポートフォリオに関連づけられた画像情報を取得
    const existImage = await prisma.portfolioImage.findUnique({
      where: { portfolioID: portfolioID },
    });

    // 画像情報が存在する場合、S3とMySQLから削除
    if (existImage && existImage.name) {
      // S3から画像データを削除
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: existImage.name,
      };
      const deleteCommand = new DeleteObjectCommand(params);

      try {
        await s3.send(deleteCommand);

        // MySQLから画像データを削除
        await prisma.portfolioImage.delete({
          where: { portfolioID: portfolioID },
        });
        res.status(200).send("S3とMySQLから画像データが削除されました");
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(404).send("既存のデータが存在しません");
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
