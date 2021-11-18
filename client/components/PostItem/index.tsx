import React from "react";
import { If, Then } from "react-if";
import { PostType } from "../../types/Post";
import styles from "./postItem.module.scss";

const PostItem: React.FunctionComponent<PostType> = ({
  postTitle,
  postContent,
  createdAt,
  updatedAt,
  postThumnail,
}) => {
  return (
    <section className={styles.itemWrapper}>
      <If condition={postThumnail}>
        <Then>
          <img src={postThumnail} alt="" className={styles.thumnail} />
        </Then>
      </If>

      <div className={styles.meta}>
        <h1 className={styles.postTitle}>{postTitle}</h1>
      </div>
    </section>
  );
};

export default PostItem;
