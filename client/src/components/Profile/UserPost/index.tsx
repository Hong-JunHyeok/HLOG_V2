import React from 'react';
import useUserPosts from '@/hooks/useUserPost';
import { useParams } from 'react-router-dom';
import PostList from '@/components/Post/PostList';
import StyledUserPost from './StyledUserPost';

const UserPost = () => {
  const { userId } = useParams();
  const { data: { posts } } = useUserPosts(+userId);

  return (
    <StyledUserPost.Container>
      <PostList posts={posts} />
    </StyledUserPost.Container>
  );
}

export default UserPost;
