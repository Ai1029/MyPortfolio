import createError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import signinRouter from "./routes/signin";
import userRouter from "./routes/user";
import skillRouter from "./routes/skill";
import skilllevelRouter from "./routes/skilllevel";
import experienceRouter from "./routes/experience";
import experienceCategoryRouter from "./routes/experiencecategory";
import yearRouter from "./routes/year";
import monthRouter from "./routes/month";
import portfolioRouter from "./routes/portfolio";
import snsRouter from "./routes/sns";
import typeofSnsRouter from "./routes/typeofsns";
import userImageRouter from "./routes/userimage";
import portfolioImageRouter from "./routes/portfolioimage";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://my-portfolio-psi-swart-91.vercel.app",
  "https://my-portfolio-rfe3e0bpv-ai1029.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // クッキーを使用するために設定
  })
);

app.use("/signin", signinRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/skilllevel", skilllevelRouter);
app.use("/api/v1/experience", experienceRouter);
app.use("/api/v1/experiencecategory", experienceCategoryRouter);
app.use("/api/v1/year", yearRouter);
app.use("/api/v1/month", monthRouter);
app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/sns", snsRouter);
app.use("/api/v1/typeofsns", typeofSnsRouter);
app.use("/api/v1/userimg", userImageRouter);
app.use("/api/v1/portfolioimg", portfolioImageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error as JSON
  res.status(500).json({ error: err });
};

export default app;
