import React from "react";
import { CommentType } from "../../../types/Comment";
import CommentItem from "../CommentItem";
import styles from "./comment.module.scss";

interface ICommentProps {
  comments: CommentType[];
}

const CommentList: React.FunctionComponent<ICommentProps> = (props) => {
  const { comments } = props;

  return (
    <React.Fragment>
      {comments.map((comment) => (
        <CommentItem comment={comment} />
      ))}
    </React.Fragment>
  );
};

export default CommentList;
