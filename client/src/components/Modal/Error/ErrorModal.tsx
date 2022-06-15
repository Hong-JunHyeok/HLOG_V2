import styled from '@emotion/styled';
import useModals from '@/hooks/useModals';
import ColorSet from '@/styles/colorSet';

const StyledErrorModal = {
  Container: styled.div`
    display: flex;
    align-items: flex-end;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    width: 400px;
    .info {
      width: 100%;
      text-align: center;
      margin-top: .5rem;
      margin-bottom: 1.2rem;
    }
    .title {
      font-weight: bold;
      font-size: 18px;
      
    }
    .message {
      font-weight: lighter;
      line-height: 2rem;
    }
  `,
  CloseButton: styled.button`
    display: flex;
    color: ${ColorSet['--white']};
    background-color: ${ColorSet['--red600']};
    padding: 1rem;
    padding: .5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    font-weight: bold;
  `,
};

interface ErrorModalProps {
  errorTitle: string;
}

const ErrorModal = ({
  errorTitle,
}: ErrorModalProps) => {
  const { closeAllModal } = useModals();

  return (
    <StyledErrorModal.Container>
      <div className="info">
        <span className="title">{errorTitle}</span>
      </div>

      <StyledErrorModal.CloseButton onClick={closeAllModal}>닫기</StyledErrorModal.CloseButton>
    </StyledErrorModal.Container>
  );
};

export default ErrorModal;
