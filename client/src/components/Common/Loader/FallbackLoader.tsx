import React from 'react';
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
);

const PostFallbackLoader: React.FC = () => (
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
);

export default PostFallbackLoader;
