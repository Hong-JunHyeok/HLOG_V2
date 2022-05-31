import { CommentType } from '@/types/Comment';
import CommentItem from '../CommentItem';
import StyledCommentList from './StyledCommentList';

interface CommentListProps {
  comments: CommentType[]
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
