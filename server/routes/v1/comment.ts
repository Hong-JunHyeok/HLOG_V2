import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { Like } from "../../entity/Like";
import { accessTokenValidator } from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = express.Router();

router.delete(
  "/:commentId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const commentRepository = getRepository(Comment);
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

      const comment = await commentRepository
        .createQueryBuilder("comments")
        .select([
          "comments.id",
          "comments.createdAt",
          "comments.updatedAt",
          "comments.commentContent",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("comments.user", "user")
        .where("user.id = :id", { id: me.id })
        .getOne();

        
        if (me.id !== comment.user.id) {
        console.log(comment);
        return setJsonResponser(res, {
          code: 401,
          message: "자기가 쓴 댓글만 삭제할 수 있습니다.",
        });
      }

      await commentRepository
        .createQueryBuilder()
        .delete()
        .from(Comment)
        .where("id = :id", { id: commentId })
        .execute();

      setJsonResponser(res, {
        code: 201,
        message: "성공적으로 댓글을 삭제했습니다.",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/:postId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { comment } = req.body;

    if (!comment.trim()) {
      return setJsonResponser(res, {
        code: 400,
        message: "댓글을 작성해주세요.",
      });
    }

    try {
      const userRepository = getRepository(User);
      const commentRepository = getRepository(Comment);
      const postRepository = getRepository(Post);

      const user = await userRepository.findOne({
        where: { id: req.body.decodedUserId},
      });

      const exPost = await postRepository.findOne({
        where: { id: postId },
      });

      if (!exPost) {
        return setJsonResponser(res, {
          code: 403,
          message: "게시글이 없습니다.",
        });
      }

      const newComment = new Comment();

      newComment.commentContent = comment;
      newComment.post = exPost;
      newComment.user = user;

      await commentRepository.save(newComment);

      return setJsonResponser(res, {
        code: 201,
        message: "성공적으로 댓글을 작성하였습니다.",
        payload: newComment,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:commentId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { commentContent } = req.body;

    if (!commentContent.trim()) {
      return setJsonResponser(res, {
        code: 403,
        message: "수정된 내용이 없습니다.",
      });
    }

    try {
      const commentRepository = getRepository(Comment);
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

      const comment = await commentRepository
        .createQueryBuilder("comments")
        .select(["comments.id", "user.id"])
        .leftJoin("comments.user", "user")
        .where("user.id = :id", { id: me.id })
        .getOne();

      if (me.id !== comment.user.id) {
        return setJsonResponser(res, {
          code: 403,
          message: "자기가 쓴 댓글만 수정할 수 있습니다.",
        });
      }

      await commentRepository
        .createQueryBuilder()
        .update()
        .set({ commentContent })
        .where("id = :id", { id: commentId })
        .execute();

      setJsonResponser(res, {
        code: 201,
        message: "성공적으로 댓글을 수정했습니다.",
        payload: {
          commentContent,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
      const postRepository = getRepository(Post);
      const commentRepository = getRepository(Comment);

      const exPost = await postRepository.findOne({
        where: { id: postId },
      });

      if (!exPost) {
        return setJsonResponser(res, {
          code: 404,
          message: "포스트가 없습니다.",
        });
      }

      const comments = await commentRepository
        .createQueryBuilder("comments")
        .select([
          "comments.id",
          "comments.createdAt",
          "comments.updatedAt",
          "comments.commentContent",
          "comments.postId",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("comments.user", "user")
        .where("comments.postId = :id", { id: postId })
        .orderBy("comments.createdAt", "ASC")
        .orderBy("comments.updatedAt", "DESC")
        .getMany();

      setJsonResponser(res, {
        code: 200,
        message: `${postId}번 게시글 댓글 조회성공`,
        payload: comments,
      });
    } catch (error) {
      console.error(error);

      next(error);
    }
  }
);

export default router;
