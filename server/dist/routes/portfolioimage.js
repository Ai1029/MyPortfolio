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
// S3にファイルアップロードする関数
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
            cb(null, `portfolioimg/` + Date.now().toString() + "-" + file.originalname);
        },
    }),
    limits: { fileSize: 6000000 }, // In bytes: 6000000 bytes = 6 MB
});
// portfolio画像を新規作成
router.post("/", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send("ファイルがアップロードされていません");
    }
    console.log("S3にアップロード成功");
    const file = req.file;
    console.log("file", file);
    const imageUrl = req.file.location;
    const imageName = req.file.key;
    const portfolioID = Number(req.body.portfolioID);
    // MySQLに画像のURLを保存
    try {
        const saveImage = yield prisma.portfolioImage.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました");
    }
}));
// portfolio画像を新しい画像に置き換え（postの前にdeleteを実行する）
router.post("/:id", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const imageUrl = req.file.location;
            const imageName = req.file.key;
            // リクエストで送られてきた画像をMySQLに保存
            const newImage = yield prisma.portfolioImage.create({
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
        }
        else {
            res.status(400).send("ファイルがアップロードされていません");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました");
    }
}));
// 画像データの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolioimages = yield prisma.portfolioImage.findMany();
        res.json(portfolioimages);
    }
    catch (err) {
        console.log(err);
    }
}));
//　portfolioIDから画像を取得
router.get("/:portfolioID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolioID = Number(req.params.portfolioID);
        console.log("portfolioID", portfolioID);
        //　データベースから該当ユーザーの画像データを取得
        const image = yield prisma.portfolioImage.findUnique({
            where: { portfolioID: portfolioID },
        });
        if (image) {
            res.status(200).json(image);
        }
        else {
            res.status(404).send("画像が見つかりません");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました");
    }
}));
// portfolioIDから画像データを削除（portfolioが削除されると画像も削除されるように設定したが、念の為作成）
router.delete("/:portfolioID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioID = Number(req.params.portfolioID);
    try {
        // MySQLからポートフォリオに関連づけられた画像情報を取得
        const existImage = yield prisma.portfolioImage.findUnique({
            where: { portfolioID: portfolioID },
        });
        // 画像情報が存在する場合、S3とMySQLから削除
        if (existImage && existImage.name) {
            // S3から画像データを削除
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: existImage.name,
            };
            const deleteCommand = new client_s3_1.DeleteObjectCommand(params);
            try {
                yield s3.send(deleteCommand);
                // MySQLから画像データを削除
                yield prisma.portfolioImage.delete({
                    where: { portfolioID: portfolioID },
                });
                res.status(200).send("S3とMySQLから画像データが削除されました");
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            res.status(404).send("既存のデータが存在しません");
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=portfolioimage.js.map