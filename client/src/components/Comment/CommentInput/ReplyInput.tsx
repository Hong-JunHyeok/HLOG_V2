import React, { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StyledCommentInput from './StyledCommentInput';
import useCreateReply from '@/hooks/mutations/useCreateReply';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import LoginRequireModal from '@/components/Modal/Auth/LoginRequireModal';

interface ReplyInputProps {
  commentId: number;
}

const ReplyInput = ({
  commentId,
}: ReplyInputProps) => {
  const [reply, setReply] = useState('');
  const createReply = useCreateReply();
  const { state: { isAuthenticated } } = useAuth();
  const { openModal } = useModals();

  const handleCreateReply = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      openModal('login_require', LoginRequireModal);
      return;
    }

    await createReply({
      commentId,
      reply,
    });
    setReply('');
  };

  return (
    <StyledCommentInput.Container onSubmit={handleCreateReply}>
      <input value={reply} onChange={(event) => setReply(event.target.value)} className="comment_input" placeholder="여기에 답글을 입력해주세요." />
      <button type="submit" className="comment_button">
        <FontAwesomeIcon icon={solid('paper-plane')} />
      </button>
    </StyledCommentInput.Container>
  );
};

export default ReplyInput;
