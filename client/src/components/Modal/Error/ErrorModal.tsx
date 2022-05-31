import useModal from '@/hooks/useModal';
import Modal from '../Modal';
import StyledErrorModal from './StyledErrorModal';

interface ErrorModalProps {
  errorTitle: string;
  visible: boolean;
}

const ErrorModal = ({
  errorTitle,
  visible,
}: ErrorModalProps) => {
  const { closeModal } = useModal();

  return (
    <Modal visible={visible}>
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
