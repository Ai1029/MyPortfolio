import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
//環境変数を切り替え
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
console.log("NODE_ENV", process.env.NODE_ENV);

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

// S3にファイルアップロード
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
      cb(null, `userimg/` + Date.now().toString() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 6000000 }, // In bytes: 6000000 bytes = 6 MB
});

// // クライアントからの画像アップロード（これだと1回目はOKだが、2回目以降アップロードする時にMySQLにデータが入っているからエラーになる）
// router.post("/", upload.single("image"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("ファイルがアップロードされていません");
//   }
//   console.log("アップロード成功");
//   const file = req.file;
//   console.log("file", file);

//   const imageUrl = (req.file as CustomFile).location;
//   const imageName = (req.file as CustomFile).key;
//   const userID = Number(req.body.userID);

//   // MySQLに画像のURLを保存
//   try {
//     const saveImage = await prisma.image.create({
//       data: {
//         name: imageName,
//         url: imageUrl,
//         userID: userID, // 画像とユーザーを関連付け
//       },
//     });
//     console.log("画像URLがMySQLに保存されました");
//     res.status(200).json("画像がアップロードされ、URLが保存されました");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("エラーが発生しました");
//   }
// });

// クライアントからの画像アップロード（postのリクエストが来たらユーザーに関連する画像がないか先に確認してからアップロードする）
// multerを使ってformDataの解析も行うから先にAWSへアップロードは済ませる
router.patch(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("ファイルがアップロードされていません");
    }
    console.log("S3にアップロード成功");

    try {
      // リクエストから必要な情報を取得
      const userID = Number(req.body.userID);
      console.log("userID", userID);
      console.log("ユーザーIDをゲット");
      const file = req.file;

      // MySQLからユーザーに関連づけられた画像情報を取得
      const existImage = await prisma.userImage.findUnique({
        where: { userID: userID },
      });

      // 既存の画像情報が存在する場合、S3とMySQLから削除
      if (existImage && existImage.name) {
        // S3から既存のデータを削除
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: existImage.name,
        };
        const deleteCommand = new DeleteObjectCommand(params);

        try {
          const data = await s3.send(deleteCommand);
          console.log("S3から既存のデータが削除されました", data);

          // MySQLから既存のデータを削除
          await prisma.userImage.delete({
            where: { userID: userID },
          });
          console.log("MySQLから既存のデータが削除されました");
        } catch (error) {
          console.error(error);
        }
      }

      // 既存の画像データが存在せず、リクエスト画像が存在する場合
      if (file) {
        // S3に保存した内容を取得
        const imageUrl = (req.file as CustomFile).location;
        const imageName = (req.file as CustomFile).key;

        // リクエストで送られてきた画像をMySQLに保存
        const newImage = await prisma.userImage.create({
          data: {
            name: imageName,
            url: imageUrl,
            userID: userID, // 画像とユーザーを関連付け
          },
        });
      } else {
        res.status(400).send("ファイルがアップロードされていません");
      }
      res.status(200).send("新しい画像がアップロードされ、URLが保存されました");
    } catch (error) {
      console.error(error);
      res.status(500).send("エラーが発生しました");
    }
  }
);

//　画像を取得
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;

    //　データベースから該当ユーザーの画像データを取得
    const image = await prisma.userImage.findUnique({
      where: { userID: Number(userID) },
    });

    if (!image) {
      // 該当する画像が見つからない場合、デフォルトの画像URLを送信
      return res.status(200).json({
        url: "https://my-portfolio-images-s3.s3.ap-northeast-1.amazonaws.com/userimg/default.png",
      });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("エラーが発生しました");
  }
});

export default router;
