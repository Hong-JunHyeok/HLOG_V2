import React, { useCallback } from "react";
import { If, Then, Else } from "react-if";
import { PostType } from "../../../types/Post";
import styles from "./postItem.module.scss";
import { useRouter } from "next/router";
import dateFormatter from "../../../utils/formatter/date-format";

const PostItem: React.FunctionComponent<PostType> = ({
  id,
  postTitle,
  createdAt,
  updatedAt,
  postThumnail,
  user: { username },
}) => {
  const router = useRouter();

  const handlePushViewPost = useCallback(() => {
    router.push(`/post/${id}`);
  }, []);

  return (
    <section className={styles.itemWrapper} onClick={handlePushViewPost}>
      <If condition={postThumnail}>
        <Then>
          <img src={postThumnail} alt="" className={styles.thumnail} />
        </Then>
      </If>

      <div className={styles.meta}>
        <h1 className={styles.postTitle}>{postTitle}</h1>
        <span className={styles.userName}>{username} 님</span>
        <If condition={updatedAt !== createdAt}>
          <Then>
            <span>최근 수정됨 : {dateFormatter(updatedAt)}</span>
          </Then>
          <Else>
            <span>작성일 : {dateFormatter(createdAt)}</span>
          </Else>
        </If>
      </div>
    </section>
  );
};

export default PostItem;
