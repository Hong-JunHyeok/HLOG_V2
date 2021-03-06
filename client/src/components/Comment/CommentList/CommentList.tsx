import { CommentType } from '@/@types/comment';
import { ReplyType } from '@/@types/reply';
import CommentItem from '../CommentItem/CommentItem';
import StyledCommentList from './StyledCommentList';

interface CommentListProps {
  comments: CommentType[] | ReplyType[]
}

const CommentList = ({
  comments,
}: CommentListProps) => {
  const mapComments = comments
    && comments.map((comment) => <CommentItem key={comment.id} comment={comment} />);

  return (
    <StyledCommentList.Container>
      {mapComments}
    </StyledCommentList.Container>
  );
};

export default CommentList;
