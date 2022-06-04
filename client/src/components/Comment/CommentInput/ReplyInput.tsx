import React, { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import StyledCommentInput from './StyledCommentInput';
import useCreateReply from '@/hooks/mutations/useCreateReply';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal/Modal';

interface ReplyInputProps {
  commentId: number;
}

const ReplyInput = ({
  commentId,
}: ReplyInputProps) => {
  const [reply, setReply] = useState('');
  const createReply = useCreateReply();
  const { state: { isAuthenticated } } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleCreateReply = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      openModal();
      return;
    }

    await createReply({
      commentId,
      reply,
    });
    setReply('');
  };

  const handleRequireLoginModal = () => {
    closeModal();
    navigate('/login');
  };

  return (
    <>
      <StyledCommentInput.Container onSubmit={handleCreateReply}>
        <input value={reply} onChange={(event) => setReply(event.target.value)} className="comment_input" placeholder="여기에 답글을 입력해주세요." />
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

export default ReplyInput;
