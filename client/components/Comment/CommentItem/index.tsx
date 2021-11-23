import React, { useCallback, useMemo } from "react";
import { If, Else, Then } from "react-if";
import { delteCommentRequest } from "../../../apis/comment";
import { useAuthState } from "../../../contexts/AuthContext";
import { usePostDispatch } from "../../../contexts/PostContext";
import useToggle from "../../../hooks/useToggle";
import { CommentType } from "../../../types/Comment";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./commentItem.module.scss";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import DefaultProfile from "../../../assets/svg/default_profile.svg";

interface ICommentProps {
  comment: CommentType;
}

const CommentItem: React.FunctionComponent<ICommentProps> = (props) => {
  const { comment } = props;
  const { myInfo, isLoggedIn } = useAuthState();
  const postDispatch = usePostDispatch();

  const [isLiked, toggleLike] = useToggle(false);
  const [isEditMode, , editOpen, editClose] = useToggle(false);

  const isMyComment = myInfo && comment.user.id === myInfo.id ? true : false;

  const handleDelete = useCallback(async () => {
    if (confirm("정말로 삭제하시겠습니까? 삭제한 댓글은 복구할 수 없습니다.")) {
      await delteCommentRequest(comment.id);

      postDispatch({
        type: "DELETE_COMMENT",
        payload: comment.id,
      });
    }
  }, []);

  const handleEdit = useCallback(async () => {
    // TODO: 수정기능
  }, []);

  return (
    <React.Fragment>
      <div
        className={styles.container}
        onMouseEnter={editOpen}
        onMouseLeave={editClose}
      >
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

          {isMyComment && isEditMode && isLoggedIn && (
            <div className={styles.editMode}>
              <button onClick={handleEdit} className={styles.edit}>
                수정
              </button>
              <button onClick={handleDelete} className={styles.delete}>
                삭제
              </button>
            </div>
          )}
        </header>

        <p className={styles.content}>{comment.commentContent}</p>
        <footer className={styles.emotion}>
          {isLiked ? (
            <React.Fragment>
              <FcLike onClick={toggleLike} />
              <span className={styles.ment}>
                {myInfo.username}님 외, 48명이 이 댓글에 공감합니다.
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FcLikePlaceholder onClick={toggleLike} />
              <span className={styles.ment}>48명이 이 댓글에 공감합니다.</span>
            </React.Fragment>
          )}
        </footer>
      </div>
    </React.Fragment>
  );
};

export default CommentItem;
