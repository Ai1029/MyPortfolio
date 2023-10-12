"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const signin_1 = __importDefault(require("./routes/signin"));
const user_1 = __importDefault(require("./routes/user"));
const skill_1 = __importDefault(require("./routes/skill"));
const experience_1 = __importDefault(require("./routes/experience"));
const work_1 = __importDefault(require("./routes/work"));
const sns_1 = __importDefault(require("./routes/sns"));
const image_1 = __importDefault(require("./routes/image"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
}));
app.use("/signin", signin_1.default);
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/skill", skill_1.default);
app.use("/api/v1/experience", experience_1.default);
app.use("/api/v1/work", work_1.default);
app.use("/api/v1/sns", sns_1.default);
app.use("/api/v1/img", image_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
const errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error as JSON
    res.status(500).json({ error: err });
};
exports.default = app;
//# sourceMappingURL=app.js.map