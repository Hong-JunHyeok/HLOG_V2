import React from 'react';
import { PostType } from '@/types/Post'
import stringCutter from '@/utils/stringCutter';
import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import S from './StyledPostItem';

interface PropTypes {
  postData: PostType;
}

const PostItem: React.FunctionComponent<PropTypes> = ({ postData }) => {
  const { 
    postThumnail, postTitle, postContent, createdAt,
    user: { 
      username, 
      profileUrl
    } 
  } = postData;

  return (
    <S.Container>
      <S.Thumbnail thumbnailUrl={postThumnail || ThumbnailPlaceholder} />
      <S.Content>
        <h1>{postTitle}</h1>
        <p>{stringCutter(postContent, 150)}</p>
      </S.Content>
      <S.Meta profileUrl={profileUrl}>
      {profileUrl ? 
        <figure />
        :
        <DefaultProfile />
      }
      <span>{username}</span>
      <div className="view-button">
        <button>⭐️</button>
        <button>열람하기</button>
      </div>
      </S.Meta>
    </S.Container>
  )
}

export default PostItem;
