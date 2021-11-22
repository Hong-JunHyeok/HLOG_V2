import React, { useMemo } from "react";
import { PostType } from "../../../types/Post";
import PostItem from "../PostItem";
import styles from "./postList.module.scss";

interface IPostListPost {
  posts: Array<PostType>;
}

const PostList: React.FunctionComponent<IPostListPost> = ({ posts }) => {
  const postsMap = useMemo(
    () => posts.map((post) => <PostItem {...post} key={post.id} />),
    []
  );

  return (
    <React.Fragment>
      <div className={styles.postList}>{postsMap}</div>
    </React.Fragment>
  );
};

export default PostList;
