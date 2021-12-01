import React, { useMemo } from "react";
import { Else, If, Then } from "react-if";
import { PostType } from "../../../types/Post";
import PostItem from "../PostItem";
import styles from "./postList.module.scss";
import NoData from "../../../assets/svg/no_data.svg";

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
      <If condition={postsMap.length === 0}>
        <Then>
          <div className={styles.noData}>
            <h1>데이터가 없습니다.</h1>
            <img src={NoData} alt="" draggable={false} />
          </div>
        </Then>
        <Else>
          <div className={styles.postList}>{postsMap}</div>
        </Else>
      </If>
    </React.Fragment>
  );
};

export default PostList;
