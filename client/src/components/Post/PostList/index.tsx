import React from 'react';
import PostItem from '../PostItem';
import S from './StyledPostList';
import { PostType } from '@/@types/post';

interface PostListProps {
  posts: PostType[];
}

const PostList: React.FunctionComponent<PostListProps> = ({ posts }) => {
  const mappedPostList = posts.map((postItem) => <PostItem key={postItem.id} {...postItem} />);

  return (
    <S.Container>
      {posts.length
        ? <S.PostList>{mappedPostList}</S.PostList>
        : <S.NoContent />}
    </S.Container>
  );
};

export default PostList;
