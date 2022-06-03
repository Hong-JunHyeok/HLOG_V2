import { useQueryClient } from 'react-query';
import { useMemo } from 'react';
import StyledCommentItem from './StyledCommentItem';
import startWithURL from '@/utils/startWithURL';
import DefaultProfile from '@/../public/assets/default_profile.svg';
import useMyInfo from '@/hooks/queries/useMyInfo';
import useToggle from '@/hooks/useToggle';
import useInput from '@/hooks/useInput';
import { ReplyType } from '@/@types/reply';
import useEditReply from '@/hooks/mutations/useEditReply';
import useDeleteReply from '@/hooks/mutations/useDeleteReply';

interface CommentItemProps {
  reply: ReplyType
}

const ReplyItem = ({
  reply,
}: CommentItemProps) => {
  const {
    user: {
      username,
      profileUrl,
      id,
    },
    commentContent,
  } = reply;
  const { data: myData } = useMyInfo();
  const queryClient = useQueryClient();

  const [editReplyValue, changeEditReplyValue, setEditReplyValue] = useInput(commentContent);
  const editReply = useEditReply(reply.id);
  const deleteReply = useDeleteReply(reply.id);

  const {
    state: isEdit,
    toggleOpen: onEdit,
    toggleClose: unEdit,
  } = useToggle(false);

  const isMyComment = useMemo(() => {
    if (myData?.user.id === id) return true;
    return false;
  }, [myData, id]);

  const handleEdit = () => {
    setEditReplyValue(commentContent);
    onEdit();
  };

  const handleUnEdit = () => {
    setEditReplyValue(commentContent);
    unEdit();
  };

  const handleEditReply = async () => {
    await editReply(editReplyValue);
    queryClient.invalidateQueries(['reply']);
    handleUnEdit();
  };

  const handleDeleteReply = async () => {
    await deleteReply();
    queryClient.invalidateQueries(['reply']);
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
              <input type="text" className="edit_comment_input" value={editReplyValue} onChange={changeEditReplyValue} />
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
              <button type="button" onClick={handleEditReply}>확인</button>
              <button type="button" onClick={handleUnEdit}>취소</button>
            </>
          )
          : (
            <>
              <button type="button" onClick={handleEdit}>수정</button>
              <button type="button" onClick={handleDeleteReply}>삭제</button>
            </>
          )}

      </StyledCommentItem.Setting>
      )}

    </StyledCommentItem.Container>
  );
};

export default ReplyItem;
