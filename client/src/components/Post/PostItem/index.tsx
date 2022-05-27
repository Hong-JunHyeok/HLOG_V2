import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useNavigate } from 'react-router-dom';
import stringCutter from '@/utils/stringCutter';
import S from './StyledPostItem';
import { PostType } from '@/@types/post';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useToggle from '@/hooks/useToggle';
import startWithURL from '@/utils/startWithURL';

const PostItem: React.FunctionComponent<PostType> = ({
  id,
  postThumnail,
  postTitle,
  postContent,
  user: {
    username,
    profileUrl,
  },
}) => {
  const navigate = useNavigate();
  const [liked, toggleLiked] = useToggle(false);

  const handlePushPostView = () => navigate(`/post/${id}`);

  return (
    <S.Container onClick={handlePushPostView}>
      <S.Thumbnail thumbnailUrl={postThumnail || ThumbnailPlaceholder} />
      <S.Content>
        <h1>{postTitle}</h1>
        <p>{stringCutter(postContent, 150)}</p>
      </S.Content>
      <S.Meta>
        <S.ProfileContainer>
          {profileUrl
            ? <S.Figure profileUrl={startWithURL(profileUrl)} />
            : <DefaultProfile />}
        </S.ProfileContainer>
        <span>{username}</span>
        <S.Like onClick={(event) => {
          event.stopPropagation();
          toggleLiked();
        }}
        >
          {liked
            ? <FontAwesomeIcon icon={solid('thumbs-up')} />
            : <FontAwesomeIcon icon={regular('thumbs-up')} />}
        </S.Like>
      </S.Meta>
    </S.Container>
  );
};

export default PostItem;
