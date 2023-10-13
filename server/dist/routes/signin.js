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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccount = require("../../fir-login-0430-firebase-adminsdk-7f4vq-ec68f1d2e7.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const idToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1]; // headerに入っていたidトークンを取得
        if (!idToken) {
            return res.status(401).send("IDトークンを受け取れませんでした");
        }
        //　idTokenに紐づけられたuidを取得する
        const uid = yield firebase_admin_1.default
            .auth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
            return decodedToken.uid;
        });
        console.log("uidゲット");
        //  uidからユーザーを探す
        const user = yield prisma.user.findUnique({
            where: {
                uid,
            },
        });
        if (user) {
            res.status(200).json(user); // ユーザー情報をJSONで返す
        }
        else {
            return res.status(404).send("ユーザーは見つかりませんでした");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("エラーが発生しました");
    }
}));
exports.default = router;
//# sourceMappingURL=signin.js.map