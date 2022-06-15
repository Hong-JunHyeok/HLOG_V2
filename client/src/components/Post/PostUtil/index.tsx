import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  useMemo,
} from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StyledLike from './StyledLike';
import usePostLike from '@/hooks/mutations/usePostLike';
import { PostType } from '@/@types/post';
import { UserType } from '@/@types/user';
import usePostUnlike from '@/hooks/mutations/usePostUnlike';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';

interface PostUtilProps {
  post: PostType;
  user: UserType;
}

const PostUtil = ({
  post,
  user,
}: PostUtilProps) => {
  const { openModal } = useModal();
  const { state: { isAuthenticated } } = useAuth();
  const likeNumber = useMemo(() => post.like.length, [post.like]);
  const isLiked = useMemo(
    () => post.like.map((like) => like.userId).includes(user?.id),
    [post.like, user?.id],
  );
  const likePost = usePostLike(post.id);
  const unlikePost = usePostUnlike(post.id);

  const handleClickLike = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      openModal();
      return;
    }

    if (!isLiked) {
      likePost();
    } else {
      unlikePost();
    }
  };

  const handleClickShare = () => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
    toast('클립보드에 복사되었습니다.', {
      type: 'success',
      theme: 'colored',
    });
  };

  return (
    <StyledLike.Container>
      <StyledLike.Section>
        <StyledLike.Like onClick={handleClickLike}>
          <FontAwesomeIcon icon={regular('heart')} className={isLiked ? 'liked' : ''} />
          {likeNumber}
        </StyledLike.Like>
      </StyledLike.Section>

      <StyledLike.Section>

        <StyledLike.Share
          onClick={handleClickShare}
        >
          <FontAwesomeIcon icon={solid('share-from-square')} />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
          />
        </StyledLike.Share>
      </StyledLike.Section>
    </StyledLike.Container>
  );
};

export default PostUtil;
