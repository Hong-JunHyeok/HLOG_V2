import React from 'react';
import { Link } from 'react-router-dom'
import PostItem from '@/components/Post/PostItem';
import S from './StyledPostList';
import { PostType } from '@/types/Post';

interface PropTypes {
  postList?: PostType[]
}

const PostList: React.FunctionComponent<PropTypes> = ({ postList = [] }) => {
  const mappedPostList = postList.map((postItem) => 
    <PostItem key={postItem.id} postData={postItem} />
  )

  return (
    <S.Container>
      <S.PostMenu>
        <MenuList />
      </S.PostMenu>
      <S.PostList>
        {mappedPostList}
      </S.PostList>
    </S.Container>
  )
}

export const MenuList: React.FC = () => (
  <React.Fragment>
    <li>
      <Link to="/">인기 게시글</Link>
    </li>
    <li>
      <Link to="/recent">최근 게시글</Link>
    </li>
  </React.Fragment>
)

export default PostList;

// import React from "react";
// import useSWR from "swr";
// import fetcher from 'utils/fetcher';
// import { PostType } from 'types/Post';
// import { Else, If, Then } from "react-if";
// import PostItem from "../PostItem";
// import styles from "./postList.module.scss";

// const PostList: React.FunctionComponent = () => {
// 	const { data : { posts } } = useSWR('/post/posts', fetcher, {
// 		suspense: true
// 	});

// 	const postsMap = posts.map((post: PostType) => <PostItem {...post} key={post.id} />);

// 	return (
// 		<React.Fragment>
// 			<div className={styles.postList}>{postsMap}</div>
// 		</React.Fragment>
// 	);
// };

// export default PostList;
