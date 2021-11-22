import React, { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./commentInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../../hooks/useInput";
import { createCommentRequest } from "../../../apis/comment";
import { useAuthState } from "../../../contexts/AuthContext";
import { usePostDispatch, usePostState } from "../../../contexts/PostContext";
import { createDeflate } from "zlib";

interface ICommentProps {}

const CommentInput: React.FunctionComponent<ICommentProps> = (props) => {
  const authState = useAuthState();
  const postState = usePostState();
  const postDispatch = usePostDispatch();
  const [commentState, onChangeCommentState] = useInput("", true);
  const router = useRouter();

  const getPostId = useCallback(() => {
    return router.query.id as string;
  }, []);

  const handleCommentSubmit = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (!authState.isLoggedIn) {
        return router.push("/auth/login");
      }

      const postId = Number(getPostId());

      try {
        await createCommentRequest(postId, commentState);

        const now = new Date();
        postDispatch({
          type: "CREATE_COMMENT_SUCCESS",
          payload: {
            id: postState.comments.length + 2,
            commentContent: commentState,
            createdAt: now,
            updatedAt: now,
            user: {
              id: authState.myInfo.id,
              profileUrl: authState.myInfo.profileUrl,
              username: authState.myInfo.username,
            },
          },
        });
      } catch (error) {
        alert(error.response.message);
      }
    },
    [commentState]
  );

  return (
    <React.Fragment>
      <form onSubmit={handleCommentSubmit} className={styles.container}>
        <TextareaAutosize
          placeholder="유익한 게시글이였나요? 댓글을 남겨서 당신의 의견을 공유해주세요."
          className={styles.commentInput}
          value={commentState}
          onChange={onChangeCommentState}
        />
        <button type="submit" className={styles.commentSubmit}>
          댓글 작성
        </button>
      </form>
    </React.Fragment>
  );
};

export default CommentInput;
