import React from 'react';
import { useParams } from 'react-router-dom';
import useUserPosts from '@/hooks/queries/useUserPost';
import PostList from '@/components/Post/PostList';
import StyledUserPost from './StyledUserPost';

function UserPost() {
  const { userId } = useParams();
  const { data: { posts } } = useUserPosts(+userId);

  return (
    <StyledUserPost.Container>
      <PostList posts={posts} />
    </StyledUserPost.Container>
  );
}

export default UserPost;
