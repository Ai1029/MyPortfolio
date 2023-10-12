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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// サインアップ時にuserデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, uid, introduction, hobby } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password,
                uid,
                introduction,
                hobby,
                skill: {
                    create: [
                        {
                            name: "スキル名称",
                            description: "スキル詳細",
                        },
                    ],
                },
                experience: {
                    create: [
                        {
                            name: " ",
                            description: " ",
                        },
                    ],
                },
                work: {
                    create: [
                        {
                            name: " ",
                            description: " ",
                        },
                    ],
                },
                sns: {
                    create: [
                        {
                            name: " ",
                            url: " ",
                        },
                    ],
                },
            },
        });
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("サーバーエラーが発生しました");
    }
}));
// userデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (err) {
        console.log(err);
    }
}));
// userデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        res.json(user);
        if (!user) {
            return res.status(404).send("ユーザーは見つかりませんでした");
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("サーバーエラーが発生しました");
    }
}));
//　userデータを修正
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, email, password, introduction, hobby, } = req.body;
    try {
        const updateduser = yield prisma.user.update({
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
    }
    catch (err) {
        console.log(err);
    }
}));
// userデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deleteduser = yield prisma.user.delete({
            where: {
                id: id,
            },
        });
        return res.json(deleteduser);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map