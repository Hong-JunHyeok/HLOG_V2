import React from 'react';
import styled from '@emotion/styled';
import usePosts from '@/hooks/queries/usePosts';
import PostList from '.';

const StyledPopularList = {
  Container: styled.section`
    padding: 0 1rem;
  `,
};

const PopularPostList: React.FunctionComponent = () => {
  const { data } = usePosts('POPULAR');
  const { posts } = data;

  return <StyledPopularList.Container><PostList posts={posts} /></StyledPopularList.Container>;
};

export default PopularPostList;
