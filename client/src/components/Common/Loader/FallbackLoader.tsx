import React from 'react';
import S from './StyledFallbackLoader';

const SkeletonPost = () => (
  <S.PostSkeletonView>
    <S.Thumbnail />
    <S.Content>
      <S.ContentLine />
      <S.ContentLine />
      <S.ContentLine />
    </S.Content>
    <S.Meta />
  </S.PostSkeletonView>
);

export const PostFallbackLoader: React.FC = () => (
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

const SkeletonComment = () => (
  <S.CommentSkeletonView />
);

export const CommentFallbackLoader = () => (
  <S.CommentList>
    <SkeletonComment />
    <SkeletonComment />
    <SkeletonComment />
    <SkeletonComment />
    <SkeletonComment />
    <SkeletonComment />
  </S.CommentList>
);

export const PostViewFallbackLoader = () => (
  <S.PostView>
    <S.HeadLine />
  </S.PostView>
);
