import { NextFunction, Request, Response } from "express";
import express from "express";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";

const router = express.Router();

router.get(
  "/posts",
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = getRepository(Post).find();

    setJsonResponser(res, {
      code: 200,
      message: "모든 포스터조회 성공",
      payload: {
        posts,
      },
    });
  }
);

export default router;
