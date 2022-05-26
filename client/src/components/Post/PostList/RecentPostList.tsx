import React from 'react';
import usePosts from '@/hooks/usePosts';
import PostList from '.';
import styled from '@emotion/styled';

const RecentPostList: React.FunctionComponent = () => {
  const { data } = usePosts('RECENT');
  const posts = data.posts;

  return <StyledRecentList.Container><PostList posts={posts}/></StyledRecentList.Container>;
}

const StyledRecentList = {
  Container: styled.section`
    padding: 0 1rem;
  `
}

export default RecentPostList;
