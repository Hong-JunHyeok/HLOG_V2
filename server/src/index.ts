import "reflect-metadata";
require("dotenv").config();

import { createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import { userRouter, authRouter } from "./routes/v1";
import errorHandler from "./middlewares/errorHandler";
import tokenValidator from "./middlewares/tokenValidator";

const app = express();

app.set("PORT", process.env.PORT || 8003);

//* middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    origin: [`${process.env.CLIENT_IP}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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
app.use("/", userRouter);
app.use("/auth", authRouter);

//! Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(error, req, res, next)
);

export default app;
