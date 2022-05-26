import React from 'react';
import styled from '@emotion/styled';
import usePosts from '@/hooks/queries/usePosts';
import PostList from '.';

const StyledRecentList = {
  Container: styled.section`
    padding: 0 1rem;
  `,
};

const RecentPostList: React.FunctionComponent = () => {
  const { data } = usePosts('RECENT');
  const { posts } = data;

  return <StyledRecentList.Container><PostList posts={posts} /></StyledRecentList.Container>;
};

export default RecentPostList;
