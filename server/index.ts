import "reflect-metadata";
require("dotenv").config();

import fs from 'fs';
import { createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import {
  userRouter,
  authRouter,
  postRouter,
  commentRouter,
  replyRouter,
} from "./routes/v1";
import errorHandler from "./middlewares/errorHandler";
import { createServer } from "http";
import cookieParser from 'cookie-parser'

const app = express();
const httpServer = createServer(app);

app.set("PORT", process.env.PORT || 8003);

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());
app.use("/profiles", express.static("profiles"));
app.use("/thumbnails", express.static("thumbnails"));

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

if(!fs.existsSync('./profiles')) {
  fs.mkdirSync('./profiles');
}

if(!fs.existsSync('./thumbnails')) {
  fs.mkdirSync('./thumbnails');
}

//* DB connection
setImmediate(async () => {
  try {
    await createConnection();

    console.log("DB Connecting success");
  } catch (error) {
    console.error(error);
  }
});

//* Routes
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/reply", replyRouter);

//! Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(error, req, res, next)
);

httpServer.listen(app.get("PORT"), () => {
  console.log(`HLOG Server is running at ${app.get("PORT")}`);
});

export default app;
