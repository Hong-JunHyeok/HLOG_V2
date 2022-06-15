import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const StyledModal = {
  LoginRequireModal: styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .require_content {
      font-size: 1.3rem;
     & > .decoration {
       color: ${ColorSet['--primary']};
       font-weight: bold;
     } 
    }
    button {
      margin-top: 1rem;
      width: 50px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${ColorSet['--white']};
      background-color: ${ColorSet['--primary']};
      border-radius: 10px;
    }
  `,
};

const LoginRequireModal = () => {
  const navigate = useNavigate();
  const handlePushLogin = () => navigate('/login');

  return (
    <StyledModal.LoginRequireModal>
      <span className="require_content">
        <span className="decoration">로그인</span>
        이 필요한 서비스입니다.

      </span>
      <button onClick={handlePushLogin} type="button">확인</button>
    </StyledModal.LoginRequireModal>
  );
};

export default LoginRequireModal;
