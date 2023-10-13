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
// yearデータの一覧を取得
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const years = yield prisma.year.findMany();
        res.status(200).json(years);
    }
    catch (error) {
        console.error(error);
    }
}));
// yearデータをidで取得
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const year = yield prisma.year.findUnique({
            where: {
                id: id,
            },
        });
        res.status(200).json(year);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=year.js.map