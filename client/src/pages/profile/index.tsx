import { Suspense, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import UserLog from '@/components/Profile/UserLog';

import mediaQueryHelper from '@/styles/mediaHelper';
import UserPost from '@/components/Profile/UserPost';
import useScroller from '@/hooks/useScroller';
import ErrorBoundary from '@/components/Common/ErrorBoundary';

const StyledProfilePage = {
  ProfileContainer: styled.main`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 90vh;
    
    padding: 5rem 1rem 1rem 1rem;
    ${mediaQueryHelper('medium')} {
      padding-top: 6rem;
    }

    ${mediaQueryHelper('large')} {
      padding-top: 7rem;
    }
`,
};

const ProfilePage = () => {
  const { scrollTop } = useScroller();

  useEffect(() => {
    scrollTop();
  });

  return (
    <Suspense>
      <Header />
      <StyledProfilePage.ProfileContainer>
        <ErrorBoundary fallback={<>로딩중</>}>
          <>
            <UserLog />
            <UserPost />
          </>
        </ErrorBoundary>
      </StyledProfilePage.ProfileContainer>
      <Footer />
    </Suspense>
  );
};

export default ProfilePage;
