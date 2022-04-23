import React from 'react';
import StyledPostList from '@/components/Post/PostList/StyledPostList';
import S from './StyledFallbackLoader';

const SkeletonPost = () => (
  <S.SkeletonView>
    <S.Thumbnail />
    <S.Content>
      <S.ContentLine />
      <S.ContentLine />
      <S.ContentLine />
    </S.Content>
    <S.Meta />
  </S.SkeletonView>
)

const PostFallbackLoader: React.FC = () => {
  return (
    <StyledPostList.Container>
      <S.PostList>
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </S.PostList>
    </StyledPostList.Container>
  );
}

export default PostFallbackLoader;
