import Modal from "../Modal"
import StyledSuccessModal from './StyledSuccessModal';

interface SuccessModalProps {
  onClose: () => void;
  confirmFunction?: () => void;
  successTitle: string;
  successMessage: string;
}

const SuccessModalProps: React.FC<SuccessModalProps> = ({ 
  onClose,
  successTitle,
  successMessage,
  confirmFunction  
 }) => {
  return (
    <Modal>
      <span>{successTitle}</span>
      <p>{successMessage}</p>

      {confirmFunction && <StyledSuccessModal.ConfirmButton onClick={confirmFunction}>확인</StyledSuccessModal.ConfirmButton>}
      <StyledSuccessModal.CloseButton onClick={onClose}>닫기</StyledSuccessModal.CloseButton>
    </Modal>
  )
}

export default SuccessModalProps;
