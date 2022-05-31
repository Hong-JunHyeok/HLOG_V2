import useReply from '@/hooks/queries/useReply';
import ReplyItem from '../CommentItem/ReplyItem';
import StyledCommentList from './StyledCommentList';

interface CommentListProps {
  commentId: number;
}

const ReplyList = ({
  commentId,
}: CommentListProps) => {
  const { data: replyData } = useReply(commentId);

  const mapComments = replyData
    && replyData.map((comment) => <ReplyItem key={comment.id} reply={comment} />);

  return (
    <StyledCommentList.Container>
      {mapComments}
    </StyledCommentList.Container>
  );
};

export default ReplyList;
