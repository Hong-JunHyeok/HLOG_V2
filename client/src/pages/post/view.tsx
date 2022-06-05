import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PostView from '@/components/Post/PostView';
import PageLayout from '@/components/Common/PageLayout';
import Modal from '@/components/Modal/Modal';
import useOutsideRef from '@/hooks/useOutsideRef';
import useModal from '@/hooks/useModal';
import ColorSet from '@/styles/colorSet';
import { PostViewFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

const StyledPostView = {
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

const PostViewPage = () => {
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModal();
  const outsideRef = useOutsideRef(() => {
    if (isOpen) closeModal();
  });
  const handleRequireLoginModal = () => {
    closeModal();
    navigate('/login');
  };
  return (
    <>
      <PageLayout>
        <Suspense fallback={<PostViewFallbackLoader />}>
          <PostView />
        </Suspense>
      </PageLayout>

      <Modal>
        <StyledPostView.LoginRequireModal ref={outsideRef}>
          <span className="require_content">
            <span className="decoration">로그인</span>
            이 필요한 서비스입니다.

          </span>
          <button onClick={handleRequireLoginModal} type="button">확인</button>
        </StyledPostView.LoginRequireModal>
      </Modal>
    </>
  );
};

export default PostViewPage;
