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
// snsデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, url, userID } = req.body;
    try {
        const newsns = yield prisma.sNS.create({
            data: {
                name: name,
                url: url,
                userID: userID,
            },
        });
        res.status(200).json(newsns);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("新規経験を追加できませんでした");
    }
}));
// snsデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snses = yield prisma.sNS.findMany();
        res.status(200).json(snses);
    }
    catch (error) {
        console.error(error);
    }
}));
// snsデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const sns = yield prisma.sNS.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(sns);
    }
    catch (error) {
        console.error(error);
    }
}));
// snsデータを更新
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, url, userID } = req.body;
    try {
        const updatedsns = yield prisma.sNS.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                url: url,
                userID: userID,
            },
        });
        res.status(200).json(updatedsns);
    }
    catch (error) {
        console.error(error);
    }
}));
// snsデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedsns = yield prisma.sNS.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(deletedsns);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=sns.js.map