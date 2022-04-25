import React from 'react';
import { useRecentPosts } from "@/hooks/usePosts";
import PostItem from "../PostItem";
import S from './StyledPostList';
import { Link } from 'react-router-dom';

const RecentPostList: React.FunctionComponent = () => {
  const { data } = useRecentPosts();
  const { posts } = data.data.payload;

  const mappedPostList = posts.map((postItem) => 
    <PostItem key={postItem.id} postData={postItem} />
  )

  return (
    <S.Container>
      <S.PostMenu>
        <MenuList />
      </S.PostMenu>
        {posts.length 
        ? <S.PostList>{mappedPostList}</S.PostList>
        : <S.NoContent />
        }
    </S.Container>
  )
}

export default RecentPostList;

const MenuList: React.FC = () => (
  <React.Fragment>
    <li>
      <Link to="/">인기 게시글</Link>
    </li>
    <li>
      <Link to="/recent">최근 게시글</Link>
    </li>
  </React.Fragment>
)
