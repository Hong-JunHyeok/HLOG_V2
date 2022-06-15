import { Suspense, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import useDeleteComment from '@/hooks/mutations/useDeleteComment';
import { CommentType } from '@/@types/comment';
import StyledCommentItem from './StyledCommentItem';
import startWithURL from '@/utils/startWithURL';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useMyInfo from '@/hooks/queries/useMyInfo';
import useToggle from '@/hooks/useToggle';
import useInput from '@/hooks/useInput';
import useEditComment from '@/hooks/mutations/useEditComment';
import ReplyInput from '../CommentInput/ReplyInput';
import ReplyList from '../CommentList/ReplyList';
import { CommentFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

interface CommentItemProps {
  comment: CommentType
}

const CommentItem = ({
  comment,
}: CommentItemProps) => {
  const {
    user: {
      username,
      profileUrl,
      id,
    },
    commentContent,
  } = comment;
  const { data: myData } = useMyInfo();

  const [editCommentValue, changeEditCommentValue, setEditCommentValue] = useInput(commentContent);
  const editComment = useEditComment(comment.id);
  const deleteComment = useDeleteComment(comment.id);

  const {
    state: isEdit,
    toggleOpen: onEdit,
    toggleClose: unEdit,
  } = useToggle(false);

  const {
    state: isReplyOpen,
    toggleOpen: openReply,
    toggleClose: closeReply,
  } = useToggle(false);

  const isMyComment = useMemo(() => {
    if (myData?.user.id === id) return true;
    return false;
  }, [myData, id]);

  const handleEdit = () => {
    setEditCommentValue(commentContent);
    onEdit();
  };

  const handleUnEdit = () => {
    setEditCommentValue(commentContent);
    unEdit();
  };

  const handleEditComment = async () => {
    await editComment(editCommentValue);
    handleUnEdit();
  };

  const handleDeleteComment = async () => {
    await deleteComment();
    alert('성공적으로 삭제되었습니다.');
  };

  return (
    <StyledCommentItem.Container>
      <StyledCommentItem.Meta>
        <StyledCommentItem.ProfileContainer>
          {profileUrl
            ? <StyledCommentItem.Figure profileUrl={startWithURL(profileUrl)} />
            : <DefaultProfile />}
        </StyledCommentItem.ProfileContainer>
        <div className="meta_info">
          <span className="comment_username">{username}</span>
          {isEdit
            ? (
              <input type="text" className="edit_comment_input" value={editCommentValue} onChange={changeEditCommentValue} />
            )
            : (
              <p className="comment_content">
                {commentContent}
              </p>
            )}
        </div>
      </StyledCommentItem.Meta>

      {isMyComment
      && (
      <StyledCommentItem.Setting>
        {isEdit
          ? (
            <>
              <button type="button" onClick={handleEditComment}>수정</button>
              <button type="button" onClick={handleUnEdit}>취소</button>
            </>
          )
          : (
            <>
              <button type="button" onClick={handleEdit}>수정</button>
              <button type="button" onClick={handleDeleteComment}>삭제</button>
            </>
          )}

      </StyledCommentItem.Setting>
      )}

      {
        isReplyOpen
          ? (
            <button type="button" className="reply_button active" onClick={closeReply}>
              <FontAwesomeIcon icon={solid('chevron-down')} />
              <span>답글</span>
            </button>
          )
          : (
            <button type="button" className="reply_button" onClick={openReply}>
              <FontAwesomeIcon icon={solid('chevron-right')} />
              <span>답글</span>
            </button>
          )
      }

      {isReplyOpen && (
        <StyledCommentItem.ReplyContainer>
          <Suspense fallback={<CommentFallbackLoader />}>
            <ReplyList commentId={comment.id} />
            <ReplyInput commentId={comment.id} />
          </Suspense>
        </StyledCommentItem.ReplyContainer>
      )}

    </StyledCommentItem.Container>
  );
};

export default CommentItem;
