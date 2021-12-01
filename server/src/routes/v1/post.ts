import { NextFunction, Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import tokenValidator from "../../middlewares/tokenValidator";
import { User } from "../../entity/User";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "thumnails/");
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname); // 확장자 추출(png)
      const basename = path.basename(file.originalname, ext);
      callback(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
});

router.post(
  "/thumnail/:postId",
  upload.single("thumnail"),
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
      const postRepository = getRepository(Post);

      const existPost = await postRepository.findOne({
        where: {
          id: Number(postId),
        },
      });

      if (existPost) {
        return setJsonResponser(res, {
          code: 403,
          message: "게시글 정보가 없습니다.",
        });
      }

      await postRepository
        .createQueryBuilder()
        .update()
        .set({
          postThumnail: res.req.file.path,
        })
        .where("id = :id", { id: Number(postId) })
        .execute();

      return setJsonResponser(res, {
        code: 201,
        message: "포스트의 썸네일을 수정했습니다.",
        payload: res.req.file.path,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

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
        code: 201,
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
        .orderBy("posts.createdAt", "DESC")
        .orderBy("posts.updatedAt", "DESC")
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
  const id = Number(req.params.id);

  const postRepository = getRepository(Post);

  try {
    const post = await postRepository
      .createQueryBuilder("posts")
      .select([
        "posts.id",
        "posts.createdAt",
        "posts.updatedAt",
        "posts.postThumnail",
        "posts.postContent",
        "posts.postTitle",
        "user.username",
        "user.selfIntroduction",
        "user.id",
        "user.profileUrl",
      ])
      .leftJoin("posts.user", "user")
      .where("posts.id = :id", { id })
      .getOne();

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
