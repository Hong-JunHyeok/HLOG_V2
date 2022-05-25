import React from 'react';
import PostItem from "../PostItem";
import S from './StyledPostList';
import usePosts from '@/hooks/usePosts';

const RecentPostList: React.FunctionComponent = () => {
  const { data } = usePosts('RECENT');
  const posts = data.data.payload.posts;

  const mappedPostList = posts.map((postItem) => 
    <PostItem key={postItem.id} post={postItem} />
  )

  return (
    <S.Container>
        {posts.length 
        ? <S.PostList>{mappedPostList}</S.PostList>
        : <S.NoContent />
        }
    </S.Container>
  )
}

export default RecentPostList;
