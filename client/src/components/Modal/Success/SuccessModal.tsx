import Modal from "../Modal"
import StyledSuccessModal from './StyledSuccessModal';

interface SuccessModalProps {
  onClose: () => void;
  confirmFunction?: () => void;
  successTitle: string;
  successMessage?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  onClose,
  successTitle,
  successMessage,
  confirmFunction  
 }) => {
  console.log("Render");
  return (
    <Modal>
      <StyledSuccessModal.Container>
        <div className="info">
          <span className="title">{successTitle}</span>
          {successMessage && <p className="message">{successMessage}</p>} 
        </div>

        {confirmFunction && <StyledSuccessModal.ConfirmButton onClick={confirmFunction}>확인</StyledSuccessModal.ConfirmButton>}
        <StyledSuccessModal.CloseButton onClick={onClose}>닫기</StyledSuccessModal.CloseButton>
      </StyledSuccessModal.Container>
    </Modal>
  )
}

export default SuccessModal;
