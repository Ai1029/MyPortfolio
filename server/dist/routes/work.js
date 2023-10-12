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
// workデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, userID, } = req.body;
    try {
        const newwork = yield prisma.work.create({
            data: {
                name: name,
                description: description,
                userID: userID,
            },
        });
        res.status(200).json(newwork);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("新規経験を追加できませんでした");
    }
}));
// workデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const works = yield prisma.work.findMany();
        res.status(200).json(works);
    }
    catch (error) {
        console.error(error);
    }
}));
// workデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const work = yield prisma.work.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(work);
    }
    catch (error) {
        console.error(error);
    }
}));
// workデータを更新
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, description, userID, } = req.body;
    try {
        const updatedwork = yield prisma.work.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                userID: userID,
            },
        });
        res.status(200).json(updatedwork);
    }
    catch (error) {
        console.error(error);
    }
}));
// workデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedwork = yield prisma.work.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(deletedwork);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=work.js.map