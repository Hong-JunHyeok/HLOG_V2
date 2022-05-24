import React from 'react';

import { PostType } from '@/types/Post'
import stringCutter from '@/utils/stringCutter';
import S from './StyledPostItem';
import useLocationPush from '@/hooks/useLocationPush';

import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import DefaultProfile from '@/../public/assets/default_profile.svg';

interface PropTypes {
  post: PostType;
}

const PostItem: React.FunctionComponent<PropTypes> = ({ post }) => {

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

  return (
    <S.Container>
      <S.Thumbnail thumbnailUrl={postThumnail || ThumbnailPlaceholder} />
      <S.Content>
        <h1>{postTitle}</h1>
        <p>{stringCutter(postContent, 150)}</p>
      </S.Content>
      <S.Meta>
        {profileUrl ? 
          <S.Figure profileUrl={profileUrl} />
          :
          <DefaultProfile />
        }
        <span>{username}</span>
        <div className="view-button">
          <button>⭐️</button>
          <button onClick={useLocationPush(`/post/${id}`)}>열람하기</button>
        </div>
      </S.Meta>
    </S.Container>
  )
}

export default PostItem;
