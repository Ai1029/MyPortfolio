import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

import admin from "firebase-admin";
const serviceAccount = require("../../fir-login-0430-firebase-adminsdk-7f4vq-ec68f1d2e7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1]; // headerに入っていたidトークンを取得

    if (!idToken) {
      return res.status(401).send("IDトークンを受け取れませんでした");
    }

    //　idTokenに紐づけられたuidを取得する
    const uid = await admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken: any) => {
        return decodedToken.uid;
      });
    console.log("uidゲット");

    //  uidからユーザーを探す
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    });
    if (user) {
      res.status(200).json(user); // ユーザー情報をJSONで返す
    } else {
      return res.status(404).send("ユーザーは見つかりませんでした");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("エラーが発生しました");
  }
});

export default router;
