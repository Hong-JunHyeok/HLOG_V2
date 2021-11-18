import { NextFunction, Request, Response } from "express";
import express from "express";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import tokenValidator from "../../middlewares/tokenValidator";

const router = express.Router();

router.post(
  "/",
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postTitle, postThumnail, postContent } = req.body;

    if (!postTitle.trim()) {
      return setJsonResponser(res, {
        code: 403,
        message: "제목을 작성해주세요.",
      });
    }

    if (!postContent.trim()) {
      return setJsonResponser(res, {
        code: 403,
        message: "내용을 작성해주세요.",
      });
    }

    try {
      const postRepository = getRepository(Post);

      await postRepository.save({
        postTitle,
        postContent,
        postThumnail,
      });

      return setJsonResponser(res, {
        code: 200,
        message: "성공적으로 게시글을 작성하였습니다.",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/posts",
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await getRepository(Post).find();

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
