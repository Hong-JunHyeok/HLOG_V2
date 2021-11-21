import React, { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./commentInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../../hooks/useInput";
import { createCommentRequest } from "../../../apis/comment";
import { useAuthState } from "../../../contexts/AuthContext";

interface ICommentProps {}

const CommentInput: React.FunctionComponent<ICommentProps> = (props) => {
  const authState = useAuthState();
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
