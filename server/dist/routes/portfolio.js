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
// portfolioデータを新規で作成
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, url, userID, } = req.body;
    try {
        const newportfolio = yield prisma.portfolio.create({
            data: {
                name: name,
                description: description,
                url: url,
                userID: userID,
            },
        });
        res.status(200).json(newportfolio);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("新規経験を追加できませんでした");
    }
}));
// portfolioデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolios = yield prisma.portfolio.findMany();
        res.status(200).json(portfolios);
    }
    catch (error) {
        console.error(error);
    }
}));
// portfolioデータをuseridで取得
router.get("/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = Number(req.params.userid);
    try {
        const portfolio = yield prisma.portfolio.findMany({
            where: {
                userID: userid,
            },
            include: {
                image: true, // Portfolioに関連するPortfolioImageを取得
            },
        });
        res.status(200).json(portfolio);
    }
    catch (error) {
        console.error(error);
    }
}));
// portfolioデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const portfolio = yield prisma.portfolio.findUnique({
            where: {
                id: id,
            },
            include: {
                image: true, //portfolioに関連するportfolioImageを取得
            },
        });
        res.status(200).json(portfolio);
    }
    catch (error) {
        console.error(error);
    }
}));
// portfolioデータを更新
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { name, description, url, userID, } = req.body;
    try {
        const updatedportfolio = yield prisma.portfolio.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                url: url,
                userID: userID,
            },
        });
        res.status(200).json(updatedportfolio);
    }
    catch (error) {
        console.error(error);
    }
}));
// portfolioデータを削除
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.portfolio.delete({
            where: {
                id: id,
            },
        });
        res.status(200).send("portfolioデータを削除しました");
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=portfolio.js.map