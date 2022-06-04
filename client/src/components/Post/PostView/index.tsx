import React, { Suspense, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import usePost from '@/hooks/queries/usePost';
import S from './StyledPostView';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import useInterceptedAxios from '@/hooks/useInterceptedAxios';
import SEOHelmet from '@/components/Common/SEOHelmet';
import startWithURL from '@/utils/startWithURL';
import useMyInfo from '@/hooks/queries/useMyInfo';
import CommentInput from '@/components/Comment/CommentInput/CommentInput';
import useComments from '@/hooks/queries/useComment';
import CommentList from '@/components/Comment/CommentList/CommentList';
import PostUtil from '../PostUtil';

const PostView: React.FunctionComponent = () => {
  const { postId } = useParams<'postId'>();
  const navigator = useNavigate();
  const customAxios = useInterceptedAxios();
  const { data: userData } = useMyInfo();
  const { data: postData } = usePost(+postId);
  const { data: commentData } = useComments(+postId);

  const { post } = postData;
  const {
    id,
    postThumbnail,
    postTitle,
    postContent,
    user: {
      id: userId,
      username,
    },
  } = post;

  const isMyPost = useMemo(() => {
    if (userData?.user.id === userId) return true;
    return false;
  }, [userId, userData]);

  const handleDelete = async () => {
    if (!isMyPost) return null;

    try {
      await customAxios.delete(`/post/${id}`);
      return navigator('/');
    } catch (error) {
      return error;
    }
  };

  const handleUpdate = () => {
    if (!isMyPost) return;

    navigator(`/write?postId=${id}`);
  };

  return (
    <>
      <SEOHelmet
        title={`${postTitle} | ${username}님의 포스트`}
      />
      <S.HeadLine thumbnailUrl={startWithURL(postThumbnail) || ThumbnailPlaceholder}>
        <h1>{postTitle}</h1>

        <div className="head_meta">
          <span className="username">
            <Link className="user_link" to={`/user/${userId}`}>{username}</Link>
            님의 게시글
          </span>
          {isMyPost
          && (
          <>
            <span className="meta_btn" onKeyPress={handleUpdate} role="button" tabIndex={0} onClick={handleUpdate}>수정</span>
            <span className="meta_btn" onKeyPress={handleDelete} role="button" tabIndex={0} onClick={handleDelete}>삭제</span>
          </>
          )}
        </div>
      </S.HeadLine>
      <S.Container>
        <S.Content dangerouslySetInnerHTML={{
          __html: postContent,
        }}
        />

        <S.PostUtilContainer>
          <Suspense>
            <PostUtil
              post={post}
              user={userData?.user}
            />
          </Suspense>
        </S.PostUtilContainer>

        <S.CommentContainer>
          <CommentInput postId={id} />
          <Suspense>
            <CommentList comments={commentData} />
          </Suspense>
        </S.CommentContainer>
      </S.Container>
    </>
  );
};

export default PostView;
