import React, { useCallback } from "react";
import styles from "./commentInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";

interface ICommentProps {}

const CommentInput: React.FunctionComponent<ICommentProps> = (props) => {
  const handleCommentSubmit = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={handleCommentSubmit} className={styles.container}>
        <TextareaAutosize
          placeholder="유익한 게시글이였나요? 댓글을 남겨서 당신의 의견을 공유해주세요."
          className={styles.commentInput}
        />
        <button type="submit" className={styles.commentSubmit}>
          댓글 작성
        </button>
      </form>
    </React.Fragment>
  );
};

export default CommentInput;
