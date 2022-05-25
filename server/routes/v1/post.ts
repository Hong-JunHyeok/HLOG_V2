import { NextFunction, Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import setJsonResponser from "../../utils/setJsonResponser";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
import {accessTokenValidator} from "../../middlewares/tokenValidator";
import { User } from "../../entity/User";
import { Like } from "../../entity/Like";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "thumnails/");
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);

      callback(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
});

router.post(
  "/",
  accessTokenValidator,
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
        where: { id: req.body.decodedUserId },
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
        payload: {
          postId: newPost.id,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/recent",
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
          "posts.postContent",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("posts.user", "user")
        .leftJoinAndSelect("posts.like", "like")
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
      console.error(error);

      next(error);
    }
  }
);

router.get(
  "/popular",
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
          "posts.postContent",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .addSelect((qb) => {
          return qb
            .select("COUNT(*) AS count")
            .from(Like, "like")
            .where("post = posts.id");
        }, "likeCount")
        .leftJoin("posts.user", "user")
        .leftJoinAndSelect("posts.like", "likes")
        .orderBy("likeCount", "DESC")
        .getMany();

      setJsonResponser(res, {
        code: 200,
        message: "인기 포스터조회 성공",
        payload: {
          posts,
        },
      });
    } catch (error) {
      console.error(error);

      next(error);
    }
  }
);

router.delete(
  "/:postId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    try {
      const postRepository = getRepository(Post);
      const userRepository = getRepository(User);

      const me = await userRepository.findOne({
        where: {
         id: req.body.decodedUserId,
        },
      });

      if (!me) {
        return setJsonResponser(res, {
          code: 403,
          message: "유저 정보가 없습니다.",
        });
      }

      const post = await postRepository
        .createQueryBuilder("posts")
        .select(["posts.id", "user.id", "user.username"])
        .leftJoin("posts.user", "user")
        .where("user.id = :id", { id: me.id })
        .getOne();

      console.log(me);

      if (me.id !== post.user.id) {
        return setJsonResponser(res, {
          code: 403,
          message: "자기가 쓴 게시글만 삭제할 수 있습니다.",
        });
      }

      await postRepository
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where("id = :id", {
          id: postId,
        })
        .execute();

      setJsonResponser(res, {
        code: 201,
        message: "성공적으로 게시글을 삭제했습니다.",
      });
    } catch (error) {
      console.error(error);

      next(error);
    }
  }
);

router.patch(
  "/thumnail/:postId",
  upload.single("thumnail"),
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    try {
      const postRepository = getRepository(Post);

      const existPost = await postRepository.findOne({
        where: {
          id: Number(postId),
        },
      });

      if (!existPost) {
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

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const postRepository = getRepository(Post);

  console.log(req.params);

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

router.get(
  "/like/:postId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
      const userRepository = getRepository(User);
      const likeRepository = getRepository(Like);

      const me = await userRepository.findOne({
        where: {
          id: req.body.decodedUserId,
        },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user: me,
          post: postId,
        },
      });

      setJsonResponser(res, {
        code: 200,
        message: "좋아요 여부 조회성공",
        payload: !!alreadyLiked,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/like/:postId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
      const userRepository = getRepository(User);
      const postRepository = getRepository(Post);
      const likeRepository = getRepository(Like);

      const post = await postRepository.findOne({
        where: {
          id: Number(postId),
        },
      });

      if (!post) {
        return setJsonResponser(res, {
          code: 403,
          message: "게시글 정보가 없습니다.",
        });
      }

      const user = await userRepository.findOne({
        where: { id: req.body.decodedUserId, },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user,
          post,
        },
      });

      if (alreadyLiked) {
        return setJsonResponser(res, {
          code: 403,
          message: "이미 좋아요를 했습니다.",
        });
      }

      const newLike = new Like();

      newLike.user = user;
      newLike.post = post;

      await likeRepository.save(newLike);

      return setJsonResponser(res, {
        code: 201,
        message: "좋아요 성공",
        payload: {
          newLike,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/unlike/:postId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
      const userRepository = getRepository(User);
      const postRepository = getRepository(Post);
      const likeRepository = getRepository(Like);

      const post = await postRepository.findOne({
        where: {
          id: Number(postId),
        },
      });

      if (!post) {
        return setJsonResponser(res, {
          code: 403,
          message: "게시글 정보가 없습니다.",
        });
      }

      const user = await userRepository.findOne({
        where: { id: req.body.decodedUserId, },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user,
          post,
        },
      });

      if (!alreadyLiked) {
        return setJsonResponser(res, {
          code: 403,
          message: "좋아요를 하지않은 상태에서 취소를 할 수 없습니다.",
        });
      }

      await likeRepository.delete({
        user,
        post,
      });

      return setJsonResponser(res, {
        code: 201,
        message: "좋아요 취소 성공",
      });
    } catch (error) {
      console.error(error);

      next(error);
    }
  }
);

export default router;
