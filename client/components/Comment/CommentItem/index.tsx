import React from "react";
import { If, Else, Then } from "react-if";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import { CommentType } from "../../../types/Comment";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./commentItem.module.scss";

interface ICommentProps {
  comment: CommentType;
}

const CommentItem: React.FunctionComponent<ICommentProps> = (props) => {
  const { comment } = props;

  return (
    <React.Fragment>
      <div className={styles.container}>
        <header className={styles.meta}>
          <img
            src={comment.user.profileUrl || DefaultProfile}
            alt={comment.user.username}
            className={styles.profileImage}
          />
          <h3 className={styles.username}>{comment.user.username}</h3>
          <If condition={comment.updatedAt !== comment.createdAt}>
            <Then>
              <span className={styles.date}>
                최근 수정됨 : {dateFormatter(comment.updatedAt)}
              </span>
            </Then>
            <Else>
              <span className={styles.date}>
                작성일 : {dateFormatter(comment.createdAt)}
              </span>
            </Else>
          </If>
        </header>

        <p className={styles.content}>{comment.commentContent}</p>
        <footer className={styles.emotion}>좋아요</footer>
      </div>
    </React.Fragment>
  );
};

export default CommentItem;
