import React from 'react';
import usePosts from '@/hooks/usePosts';
import PostList from '.';
import styled from '@emotion/styled';

const PopularPostList: React.FunctionComponent = () => {
  const { data } = usePosts('POPULAR');
  const posts = data.posts;

  return <StyledPopularList.Container><PostList posts={posts}/></StyledPopularList.Container>
}

const StyledPopularList = {
  Container: styled.section`
    padding: 0 1rem;
  `
}

export default PopularPostList;
