import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import stringCutter from '@/utils/stringCutter';
import S from './StyledPostItem';
import { PostType } from '@/@types/post';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import startWithURL from '@/utils/startWithURL';

const PostItem: React.FunctionComponent<PostType> = ({
  id,
  postThumbnail,
  postTitle,
  postSummary,
  postHits,
  like,
  user: {
    username,
    profileUrl,
    id: userId,
  },
}) => {
  const navigate = useNavigate();
  const handlePushPostView = () => navigate(`/post/${id}`);
  const handlePushUserProfile = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/user/${userId}`);
  };
  const likeNumber = useMemo(() => like.length, [like]);

  return (
    <S.Container onClick={handlePushPostView}>
      <S.Thumbnail thumbnailUrl={startWithURL(postThumbnail) || ThumbnailPlaceholder} />
      <S.Content>
        <h1>{postTitle}</h1>
        <p>{stringCutter(postSummary, 150)}</p>
      </S.Content>
      <S.Meta>
        <S.ProfileContainer onClick={handlePushUserProfile}>
          {profileUrl
            ? <S.Figure profileUrl={startWithURL(profileUrl)} />
            : <DefaultProfile />}
        </S.ProfileContainer>
        <span className="username">{username}</span>
        <S.Viewer>
          <FontAwesomeIcon icon={solid('eye')} />
          {postHits}
        </S.Viewer>
        <S.Like>
          <FontAwesomeIcon icon={solid('heart')} />
          {likeNumber}
        </S.Like>
      </S.Meta>
    </S.Container>
  );
};

export default PostItem;
