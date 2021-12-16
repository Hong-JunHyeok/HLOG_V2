import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Reply } from "../../entity/Reply";
import { User } from "../../entity/User";
import tokenValidator from "../../middlewares/tokenValidator";
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
        .leftJoinAndSelect("replies.like", "like")
        .where("replies.commentId = :id", { id: commentId })
        .orderBy("comments.createdAt", "DESC")
        .orderBy("comments.updatedAt", "DESC")
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

router.post(
  "/:commentId",
  tokenValidator,
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
        where: { id: req.body.decodedUserPayload.id },
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

export default router;
