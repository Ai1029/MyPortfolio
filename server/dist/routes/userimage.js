"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucketName = process.env.AWS_BUCKET_NAME;
// S3にファイルアップロード
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: bucketName,
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
router.patch("/", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existImage = yield prisma.userImage.findUnique({
            where: { userID: userID },
        });
        // 既存の画像情報が存在する場合、S3とMySQLから削除
        if (existImage && existImage.name) {
            // S3から既存のデータを削除
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: existImage.name,
            };
            const deleteCommand = new client_s3_1.DeleteObjectCommand(params);
            try {
                const data = yield s3.send(deleteCommand);
                console.log("S3から既存のデータが削除されました", data);
                // MySQLから既存のデータを削除
                yield prisma.userImage.delete({
                    where: { userID: userID },
                });
                console.log("MySQLから既存のデータが削除されました");
            }
            catch (error) {
                console.error(error);
            }
        }
        // 既存の画像データが存在せず、リクエスト画像が存在する場合
        if (file) {
            // S3に保存した内容を取得
            const imageUrl = req.file.location;
            const imageName = req.file.key;
            // リクエストで送られてきた画像をMySQLに保存
            const newImage = yield prisma.userImage.create({
                data: {
                    name: imageName,
                    url: imageUrl,
                    userID: userID, // 画像とユーザーを関連付け
                },
            });
        }
        else {
            res.status(400).send("ファイルがアップロードされていません");
        }
        res.status(200).send("新しい画像がアップロードされ、URLが保存されました");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました");
    }
}));
//　画像を取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        //　データベースから該当ユーザーの画像データを取得
        const image = yield prisma.userImage.findUnique({
            where: { userID: Number(userID) },
        });
        if (!image) {
            // 該当する画像が見つからない場合、デフォルトの画像URLを送信
            return res.status(200).json({
                url: "https://my-portfolio-images-s3.s3.ap-northeast-1.amazonaws.com/userimg/default.png",
            });
        }
        res.json(image);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました");
    }
}));
exports.default = router;
//# sourceMappingURL=userimage.js.map