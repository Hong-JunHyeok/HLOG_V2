import Modal from "../Modal"
import StyledErrorModal from "./StyledErrorModal";

interface ErrorModalProps {
  onClose: () => void;
  confirmFunction?: () => void;
  errorTitle: string;
  errorMessage?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ 
  onClose,
  errorTitle,
  errorMessage,
 }) => {
  return (
    <Modal>
      <StyledErrorModal.Container>
        <div className="info">
          <span className="title">{errorTitle}</span>
          {errorMessage && <p className="message">{errorMessage}</p>}
        </div>

        <StyledErrorModal.CloseButton onClick={onClose}>닫기</StyledErrorModal.CloseButton>
      </StyledErrorModal.Container>
    </Modal>
  )
}

export default ErrorModal;
