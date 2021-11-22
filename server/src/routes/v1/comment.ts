import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import tokenValidator from "../../middlewares/tokenValidator";
import setJsonResponser from "../../utils/setJsonResponser";

const router = express.Router();

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
        where: { email: req.body.decodedUserPayload.email },
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
      });
    } catch (error) {
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

      const exPost = postRepository.find({
        where: { id: postId },
      });

      if (!exPost) {
        return setJsonResponser(res, {
          code: 403,
          message: "포스트가 없습니다.",
        });
      }

      const comments = await commentRepository.find({
        where: {},
      });

      setJsonResponser(res, {
        code: 200,
        message: `${postId}번 게시글 조회성공`,
        payload: comments,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
