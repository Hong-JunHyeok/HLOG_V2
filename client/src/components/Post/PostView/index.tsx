import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import usePost from '@/hooks/queries/usePost';
import S from './StyledPostView';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import useInterceptedAxios from '@/hooks/useInterceptedAxios';
import SEOHelmet from '@/components/Common/SEOHelmet';

const PostView: React.FunctionComponent = () => {
  const { postId } = useParams<'postId'>();
  const { data } = usePost(+postId);
  const navigator = useNavigate();
  const customAxios = useInterceptedAxios();

  const { post } = data;
  const {
    id,
    postThumnail,
    postTitle,
    postContent,
    user: {
      username,
    },
  } = post;

  const handleDelete = async () => {
    try {
      await customAxios.delete(`/post/${id}`);
      return navigator('/');
    } catch (error) {
      return error;
    }
  };

  const handleUpdate = () => {
    navigator(`/write?postId=${id}`);
  };

  return (
    <S.Container>
      <SEOHelmet
        title={`${postTitle} | ${username}님의 포스트`}
      />
      <S.HeadLine thumbnailUrl={postThumnail || ThumbnailPlaceholder}>
        <h1>{postTitle}</h1>

        <div className="head_meta">
          <span className="username">
            {username}
            님의 게시글
          </span>
          <span className="meta_btn" onKeyPress={handleUpdate} role="button" tabIndex={0} onClick={handleUpdate}>수정</span>
          <span className="meta_btn" onKeyPress={handleDelete} role="button" tabIndex={0} onClick={handleDelete}>삭제</span>
        </div>
      </S.HeadLine>
      <S.Container>
        <S.Content dangerouslySetInnerHTML={{
          __html: postContent,
        }}
        />
      </S.Container>
    </S.Container>
  );
};

export default PostView;
