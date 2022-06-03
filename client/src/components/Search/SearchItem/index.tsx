import { useNavigate } from 'react-router-dom';
import { PostType } from '@/@types/post';
import startWithURL from '@/utils/startWithURL';
import StyledSearchItem from './StyledSearchItem';
import ThumbnailPlaceholder from '@/../public/assets/HLOG.png';

interface SeatchItemProps {
  post: PostType
}

const SearchItem = ({ post }: SeatchItemProps) => {
  const {
    id, postTitle, postThumbnail, user: { username },
  } = post;

  const navigate = useNavigate();

  const handlePushPostPage = (postId: number) => navigate(`/post/${postId}`);

  return (
    <StyledSearchItem.Container onClick={() => handlePushPostPage(id)}>
      <StyledSearchItem.Thumbnail
        thumbnailUrl={startWithURL(postThumbnail) || ThumbnailPlaceholder}
      />
      <StyledSearchItem.Meta>
        <span className="title">{postTitle}</span>
        <span className="username">{username}</span>
      </StyledSearchItem.Meta>
    </StyledSearchItem.Container>
  );
};

export default SearchItem;
