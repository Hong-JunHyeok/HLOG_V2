import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Reply } from "../../entity/Reply";
import { User } from "../../entity/User";
import {accessTokenValidator} from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = express.Router();

router.get(
  "/:commentId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    try {
      const commentRepository = getRepository(Comment);
      const replyRepository = getRepository(Reply);

      const exComment = await commentRepository.findOne({
        where: {
          id: commentId,
        },
      });

      if (!exComment) {
        return setJsonResponser(res, {
          code: 404,
          message: "댓글이 없습니다.",
        });
      }

      const replies = await replyRepository
        .createQueryBuilder("replies")
        .select([
          "replies.id",
          "replies.createdAt",
          "replies.updatedAt",
          "replies.commentContent",
          "replies.commentId",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("replies.user", "user")
        .where("replies.commentId = :id", { id: commentId })
        .orderBy("replies.createdAt", "ASC")
        .addOrderBy("replies.updatedAt", "ASC")
        .getMany();

      setJsonResponser(res, {
        code: 200,
        message: `${commentId}번 게시글 댓글 조회성공`,
        payload: replies,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  "/:replyId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.params;
    const { commentContent } = req.body;

    try {
      const userRepository = getRepository(User);
      const replyRepository = getRepository(Reply);

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

      const reply = await replyRepository
        .createQueryBuilder("replies")
        .select(["replies.id", "user.id"])
        .leftJoin("replies.user", "user")
        .where("user.id = :id", { id: me.id })
        .getOne();

      if (me.id !== reply.user.id) {
        return setJsonResponser(res, {
          code: 403,
          message: "자기가 쓴 답글만 수정할 수 있습니다.",
        });
      }

      await replyRepository
        .createQueryBuilder()
        .update()
        .set({ commentContent })
        .where("id = :id", { id: replyId })
        .execute();

      setJsonResponser(res, {
        code: 201,
        message: "성공적으로 답글을 수정했습니다.",
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

router.post(
  "/:commentId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const { commentContent } = req.body;

    if (!commentContent.trim()) {
      return setJsonResponser(res, {
        code: 400,
        message: "답글을 작성해주세요.",
      });
    }

    try {
      const userRepository = getRepository(User);
      const commentRepository = getRepository(Comment);
      const replyRepository = getRepository(Reply);

      const user = await userRepository.findOne({
        where: { id: req.body.decodedUserId },
      });

      const exComment = await commentRepository.findOne({
        where: { id: commentId },
      });

      if (!exComment) {
        return setJsonResponser(res, {
          code: 403,
          message: "댓글이 없습니다.",
        });
      }

      const newReply = new Reply();

      newReply.commentContent = commentContent;
      newReply.comment = exComment;
      newReply.user = user;

      await replyRepository.save(newReply);

      return setJsonResponser(res, {
        code: 201,
        message: "성공적으로 댓글을 작성하였습니다.",
        payload: newReply,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:replyId",
  accessTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { replyId } = req.params;

    try {
      const replyRepository = getRepository(Reply);
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

      const comment = await replyRepository
        .createQueryBuilder("replies")
        .select([
          "replies.id",
          "replies.createdAt",
          "replies.updatedAt",
          "replies.commentContent",
          "user.username",
          "user.id",
          "user.profileUrl",
        ])
        .leftJoin("replies.user", "user")
        .where("user.id = :id", { id: me.id })
        .getOne();

      if (me.id !== comment.user.id) {
        return setJsonResponser(res, {
          code: 403,
          message: "자기가 쓴 댓글만 삭제할 수 있습니다.",
        });
      }

      await replyRepository
        .createQueryBuilder()
        .delete()
        .from(Reply)
        .where("id = :id", { id: replyId })
        .execute();

      setJsonResponser(res, {
        code: 201,
        message: "성공적으로 답글을 삭제했습니다.",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
