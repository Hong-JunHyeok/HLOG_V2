import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { Like } from "../../entity/Like";
import tokenValidator from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = express.Router();

router.delete(
  "/:commentId",
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const commentRepository = getRepository(Comment);
      const userRepository = getRepository(User);

      const me = await userRepository.findOne({
        where: {
          email: req.body.decodedUserPayload.email,
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
        return setJsonResponser(res, {
          code: 403,
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
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { commentContent } = req.body;

    if (!commentContent.trim()) {
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
        where: { id: req.body.decodedUserPayload.id },
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

      newComment.commentContent = commentContent;
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
  tokenValidator,
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
          email: req.body.decodedUserPayload.email,
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
          code: 403,
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
        .leftJoinAndSelect("comments.like", "like")
        .where("comments.postId = :id", { id: postId })
        .orderBy("comments.createdAt", "DESC")
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

router.get(
  "/like/:commentId",
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const userRepository = getRepository(User);
      const likeRepository = getRepository(Like);

      const me = await userRepository.findOne({
        where: {
          email: req.body.decodedUserPayload.email,
        },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user: me,
          comment: commentId,
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
  "/like/:commentId",
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const userRepository = getRepository(User);
      const commentRepository = getRepository(Comment);
      const likeRepository = getRepository(Like);

      const comment = await commentRepository.findOne({
        where: {
          id: Number(commentId),
        },
      });

      if (!comment) {
        return setJsonResponser(res, {
          code: 403,
          message: "댓글 정보가 없습니다.",
        });
      }

      const user = await userRepository.findOne({
        where: { email: req.body.decodedUserPayload.email },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user,
          comment,
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
      newLike.comment = comment;

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
  "/unlike/:commentId",
  tokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const userRepository = getRepository(User);
      const commentRepository = getRepository(Comment);
      const likeRepository = getRepository(Like);

      const comment = await commentRepository.findOne({
        where: {
          id: Number(commentId),
        },
      });

      if (!comment) {
        return setJsonResponser(res, {
          code: 404,
          message: "댓글 정보가 없습니다.",
        });
      }

      const user = await userRepository.findOne({
        where: { email: req.body.decodedUserPayload.email },
      });

      const alreadyLiked = await likeRepository.findOne({
        where: {
          user,
          comment,
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
        comment,
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
