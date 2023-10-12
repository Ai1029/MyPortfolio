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
// experienceデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, userID, } = req.body;
    try {
        const newexperience = yield prisma.experience.create({
            data: {
                name: name,
                description: description,
                userID: userID,
            },
        });
        res.status(200).json(newexperience);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("新規経験を追加できませんでした");
    }
}));
// experienceデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experiences = yield prisma.experience.findMany();
        res.status(200).json(experiences);
    }
    catch (error) {
        console.error(error);
    }
}));
// experienceデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const experience = yield prisma.experience.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(experience);
    }
    catch (error) {
        console.error(error);
    }
}));
// experienceデータを更新
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, description, userID, } = req.body;
    try {
        const updatedexperience = yield prisma.experience.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                userID: userID,
            },
        });
        res.status(200).json(updatedexperience);
    }
    catch (error) {
        console.error(error);
    }
}));
// experienceデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedexperience = yield prisma.skill.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(deletedexperience);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=experience.js.map