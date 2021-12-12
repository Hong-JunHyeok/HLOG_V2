import "reflect-metadata";
require("dotenv").config();

import { createConnection } from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import { userRouter, authRouter, postRouter, commentRouter } from "./routes/v1";
import errorHandler from "./middlewares/errorHandler";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("PORT", process.env.PORT || 8003);

//* middlewares
app.use(logger("dev"));
app.use("/profiles", express.static("profiles"));
app.use("/thumnails", express.static("thumnails"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [`${process.env.CLIENT_IP}`],
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
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

//! Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
  errorHandler(error, req, res, next)
);

httpServer.listen(app.get("PORT"), () => {
  console.log(`HLOG Server is running at ${app.get("PORT")}`);
});

export default app;
