import React from "react";
import { CommentType } from "../../../types/Comment";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";

interface ICommentProps {
  comments: CommentType[];
}

const CommentList: React.FunctionComponent<ICommentProps> = (props) => {
  const { comments } = props;

  return (
    <React.Fragment>
      <div className={styles.container}>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default CommentList;
