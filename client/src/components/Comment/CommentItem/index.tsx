import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import useDeleteComment from '@/hooks/mutations/useDeleteComment';
import { CommentType } from '@/types/Comment';
import StyledCommentItem from './StyledCommentItem';
import startWithURL from '@/utils/startWithURL';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useMyInfo from '@/hooks/queries/useMyInfo';
import useToggle from '@/hooks/useToggle';
import useInput from '@/hooks/useInput';
import useEditComment from '@/hooks/mutations/useEditComment';

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
  const { postId } = useParams<{ postId: string }>();
  const queryClient = useQueryClient();

  const [editCommentValue, changeEditCommentValue, setEditCommentValue] = useInput(commentContent);
  const [isEdit,,onEdit, unEdit] = useToggle(false);
  const editComment = useEditComment(comment.id);
  const deleteComment = useDeleteComment(comment.id);

  const isMyComment = useMemo(() => {
    if (myData?.user.id === id) return true;
    return false;
  }, [myData, id]);

  const handleUnEdit = () => {
    setEditCommentValue(commentContent);
    unEdit();
  };

  const handleEditComment = async () => {
    await editComment(editCommentValue);
    queryClient.invalidateQueries(['comment', +postId]);
    handleUnEdit();
  };

  const handleDeleteComment = async () => {
    await deleteComment();
    queryClient.invalidateQueries(['comment', +postId]);
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
              <button type="button" onClick={onEdit}>수정</button>
              <button type="button" onClick={handleDeleteComment}>삭제</button>
            </>
          )}

      </StyledCommentItem.Setting>
      )}
    </StyledCommentItem.Container>
  );
};

export default CommentItem;
