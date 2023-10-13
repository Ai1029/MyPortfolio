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
// skillデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, skilllevelID, userID, } = req.body;
    try {
        const newskill = yield prisma.skill.create({
            data: {
                name: name,
                description: description,
                skilllevelID: skilllevelID,
                userID: userID,
            },
        });
        res.status(200).json(newskill);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("新規スキルを追加できませんでした");
    }
}));
// skillデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield prisma.skill.findMany();
        res.status(200).json(skills);
    }
    catch (error) {
        console.error(error);
    }
}));
// skillデータをuseridで取得
router.get("/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = Number(req.params.userid);
    try {
        const skill = yield prisma.skill.findMany({
            where: {
                userID: userid,
            },
            include: {
                skilllevel: true,
            },
            orderBy: [
                {
                    name: "asc",
                },
            ],
        });
        res.status(200).json(skill);
    }
    catch (error) {
        console.error(error);
    }
}));
// skillデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const skill = yield prisma.skill.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(skill);
    }
    catch (error) {
        console.error(error);
    }
}));
// skillデータを更新
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, description, skilllevelID, userID, } = req.body;
    try {
        const updatedskill = yield prisma.skill.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                skilllevelID: skilllevelID,
                userID: userID,
            },
        });
        res.status(200).json(updatedskill);
    }
    catch (error) {
        console.error(error);
    }
}));
// skillデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedskill = yield prisma.skill.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json("skillデータを削除しました");
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=skill.js.map