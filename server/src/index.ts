import "reflect-metadata";
require("dotenv").config();

import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/v1";

const app = express();

app.set("PORT", process.env.PORT || 8003);

//* middlewares
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

export default app;
