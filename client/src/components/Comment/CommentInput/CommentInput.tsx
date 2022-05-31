import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import StyledCommentInput from './StyledCommentInput';
import useCreateComment from '@/hooks/mutations/useCreateComment';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal/Modal';

interface CommentInputProps {
  postId: number
}

const CommentInput = ({
  postId,
}: CommentInputProps) => {
  const [comment, setComment] = useState('');
  const createComment = useCreateComment(postId);
  const { state: { isAuthenticated } } = useAuth();
  const { isOpen, openModal } = useModal();

  const handleCreateComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      openModal();
      return;
    }

    await createComment(comment);
    setComment('');
  };

  return (
    <>
      <StyledCommentInput.Container onSubmit={handleCreateComment}>
        <input value={comment} onChange={(event) => setComment(event.target.value)} className="comment_input" placeholder="여기에 댓글을 입력해주세요." />
        <button type="submit" className="comment_button">
          <FontAwesomeIcon icon={solid('paper-plane')} />
        </button>
      </StyledCommentInput.Container>
      {isOpen
    && (
    <Modal>
      로그인이 필요한 서비스입니다.
    </Modal>
    )}
    </>
  );
};

export default CommentInput;
