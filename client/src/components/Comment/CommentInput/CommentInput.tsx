import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useNavigate } from 'react-router-dom';
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
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleCreateComment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      openModal();
      return;
    }

    await createComment(comment);
    setComment('');
  };

  const handleRequireLoginModal = () => {
    closeModal();
    navigate('/login');
  };

  return (
    <>
      <StyledCommentInput.Container onSubmit={handleCreateComment}>
        <input value={comment} onChange={(event) => setComment(event.target.value)} className="comment_input" placeholder="여기에 댓글을 입력해주세요." />
        <button type="submit" className="comment_button">
          <FontAwesomeIcon icon={solid('paper-plane')} />
        </button>
      </StyledCommentInput.Container>
      <Modal visible={isOpen}>
        <StyledCommentInput.LoginRequireModal>
          <span className="require_content">
            <span className="decoration">로그인</span>
            이 필요한 서비스입니다.

          </span>
          <button onClick={handleRequireLoginModal} type="button">확인</button>
        </StyledCommentInput.LoginRequireModal>
      </Modal>
    </>
  );
};

export default CommentInput;
