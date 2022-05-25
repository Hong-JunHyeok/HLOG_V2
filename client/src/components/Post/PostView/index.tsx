import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import usePost from '@/hooks/usePost';
import S from './StyledPostView';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import customAxios from '@/utils/customAxios';

const PostView: React.FunctionComponent = () => {
  const { postId } = useParams<"postId">();
  const { data } = usePost(+postId);
  const navigator = useNavigate();

  const post = data.data.payload;
  const { 
    id,
    postThumnail, 
    postTitle, 
    postContent,
    user: { 
      username,
      profileUrl
    } 
  } = post;

  const handleDelete = async () => {
    const response = await customAxios.delete(`/post/${id}`);
    console.log(response);
  }

  const handleUpdate = () => {
    navigator(`/write?postId=${id}`);
  }

  return (
    <S.Container>
      <S.HeadLine thumbnailUrl={postThumnail || ThumbnailPlaceholder}>
        <h1>{postTitle}</h1>

        <div className="head_meta">
          <span className="username">{username}님의 게시글</span>
          <span className="meta_btn" onClick={handleUpdate}>수정</span>
          <span className="meta_btn" onClick={handleDelete}>삭제</span>
        </div>
      </S.HeadLine>
      <S.Container>
        <S.Content dangerouslySetInnerHTML={{
          __html: postContent
        }} />       
      </S.Container>
    </S.Container>
  )
}

export default PostView;
