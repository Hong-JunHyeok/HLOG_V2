import React from "react";
import { CommentType } from "../../../types/Comment";
import styles from "./commentItem.module.scss";

interface ICommentProps {
  comment: CommentType;
}

const CommentItem: React.FunctionComponent<ICommentProps> = (props) => {
  const { comment } = props;

  return (
    <React.Fragment>
      <div>
        <header>
          <img src={comment.user.profileUrl} alt="" />
          <h3>{comment.user.username}</h3>
          <span>{comment.createdAt}</span>
        </header>

        <p>{comment.commentContent}</p>
        <footer>좋아요</footer>
      </div>
    </React.Fragment>
  );
};

export default CommentItem;
