import React from "react";
import { Else, If, Then } from "react-if";
import { CommentType } from "../../../types/Comment";
import CommentItem from "../CommentItem";
import styles from "./commentList.module.scss";
import NoData from "../../../assets/svg/no_data.svg";

interface ICommentProps {
  comments: CommentType[];
}

const CommentList: React.FunctionComponent<ICommentProps> = (props) => {
  const { comments } = props;

  return (
    <React.Fragment>
      <If condition={comments.length > 0}>
        <Then>
          <div className={styles.container}>
            {comments.map((comment, index) => (
              <CommentItem comment={comment} key={comment.id} data-id={index} />
            ))}
          </div>
        </Then>
        <Else>
          <div className={styles.noData}>
            <img src={NoData} alt="" draggable={false} />이 게시글에 댓글이
            없습니다.
          </div>
        </Else>
      </If>
    </React.Fragment>
  );
};

export default CommentList;
