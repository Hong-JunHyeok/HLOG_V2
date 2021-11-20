import { NextFunction, Request, Response } from "express";
import express from "express";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import tokenValidator from "../../middlewares/tokenValidator";
import { User } from "../../entity/User";

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
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { email: req.body.decodedUserPayload.email },
      });

      const postRepository = getRepository(Post);

      const newPost = new Post();

      newPost.postTitle = postTitle;
      newPost.postThumnail = postThumnail;
      newPost.postContent = postContent;
      newPost.user = user;

      await postRepository.save(newPost);

      return setJsonResponser(res, {
        code: 200,
        message: "성공적으로 게시글을 작성하였습니다.",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/posts",
  async (req: Request, res: Response, next: NextFunction) => {
    const postRepository = getRepository(Post);

    try {
      const posts = await postRepository
        .createQueryBuilder("posts")
        .select([
          "posts.id",
          "posts.createdAt",
          "posts.updatedAt",
          "posts.postThumnail",
          "posts.postTitle",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("posts.user", "user")
        .getMany();

      setJsonResponser(res, {
        code: 200,
        message: "모든 포스터조회 성공",
        payload: {
          posts,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const postRepository = getRepository(Post);

  try {
    const post = await postRepository.findOne({
      where: { id },
    });

    setJsonResponser(res, {
      code: 200,
      message: "포스트 조회성공",
      payload: post,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
