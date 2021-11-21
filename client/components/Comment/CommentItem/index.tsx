import React from "react";
import { CommentType } from "../../../types/Comment";
import styles from "./comment.module.scss";

interface ICommentProps {
  comment: CommentType;
}

const CommentItem: React.FunctionComponent<ICommentProps> = (props) => {
  const { comment } = props;

  return (
    <React.Fragment>
      <p>{comment.commentContent}</p>
    </React.Fragment>
  );
};

export default CommentItem;
