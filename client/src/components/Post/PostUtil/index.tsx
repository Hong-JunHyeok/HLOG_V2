import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useMemo } from 'react';
import StyledLike from './StyledLike';
import usePostLike from '@/hooks/mutations/usePostLike';
import { PostType } from '@/@types/post';
import { UserType } from '@/@types/user';
import usePostUnlike from '@/hooks/mutations/usePostUnlike';

interface PostUtilProps {
  post: PostType;
  user: UserType;
}

const PostUtil = ({
  post,
  user,
}: PostUtilProps) => {
  const likeNumber = useMemo(() => post.like.length, [post.like]);
  const isLiked = useMemo(
    () => post.like.map((like) => like.userId).includes(user.id),
    [post.like, user.id],
  );

  const likePost = usePostLike(post.id);
  const unlikePost = usePostUnlike(post.id);

  const handleClickLike = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isLiked) {
      likePost();
    } else {
      unlikePost();
    }
  };

  return (
    <StyledLike.Container>
      <StyledLike.Section>
        <StyledLike.Like onClick={handleClickLike}>
          <FontAwesomeIcon icon={regular('thumbs-up')} className={isLiked ? 'liked' : ''} />
          {likeNumber}
        </StyledLike.Like>
      </StyledLike.Section>

      <StyledLike.Section>
        <StyledLike.Share>
          <FontAwesomeIcon icon={solid('share-from-square')} />
        </StyledLike.Share>
      </StyledLike.Section>

      <StyledLike.Section>
        <StyledLike.Viewer>
          <FontAwesomeIcon icon={solid('chart-area')} />
        </StyledLike.Viewer>
      </StyledLike.Section>
    </StyledLike.Container>
  );
};

export default PostUtil;
