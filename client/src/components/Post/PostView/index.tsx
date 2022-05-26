import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import usePost from '@/hooks/usePost';
import S from './StyledPostView';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import useInterceptedAxios from '@/hooks/useInterceptedAxios';
import SEOHelmet from '@/components/Common/SEOHelmet';

const PostView: React.FunctionComponent = () => {
  const { postId } = useParams<"postId">();
  const { data } = usePost(+postId);
  const navigator = useNavigate();
  const customAxios = useInterceptedAxios();

  const post = data.post;
  const { 
    id,
    postThumnail, 
    postTitle, 
    postContent,
    user: { 
      username,
    } 
  } = post;

  const handleDelete = async () => {
    try {
      await customAxios.delete(`/post/${id}`);
      navigator('/')
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const handleUpdate = () => {
    navigator(`/write?postId=${id}`);
  }

  return (
    <S.Container>
      <SEOHelmet
				title={`${postTitle} | ${username}님의 포스트`}
			/>
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
