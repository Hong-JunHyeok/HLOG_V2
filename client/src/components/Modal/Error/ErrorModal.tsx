import useModal from '@/hooks/useModal';
import Modal from '../Modal';
import StyledErrorModal from './StyledErrorModal';

interface ErrorModalProps {
  errorTitle: string;
}

const ErrorModal = ({
  errorTitle,
}: ErrorModalProps) => {
  const { closeModal } = useModal();

  return (
    <Modal>
      <StyledErrorModal.Container>
        <div className="info">
          <span className="title">{errorTitle}</span>
        </div>

        <StyledErrorModal.CloseButton onClick={closeModal}>닫기</StyledErrorModal.CloseButton>
      </StyledErrorModal.Container>
    </Modal>
  );
};

export default ErrorModal;
