import { Suspense } from 'react';
import styled from '@emotion/styled';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import UserLog from '@/components/Profile/UserLog';

import mediaQueryHelper from '@/styles/mediaHelper';
import UserPost from '@/components/Profile/UserPost';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import useScrollEffect from '@/hooks/useScrollEffect';

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
  useScrollEffect('TOP');

  return (
    <>
      <Header />
      <StyledProfilePage.ProfileContainer>
        <ErrorBoundary fallback={<>로딩중</>}>
          <Suspense>
            <UserLog />
            <UserPost />
          </Suspense>
        </ErrorBoundary>
      </StyledProfilePage.ProfileContainer>
      <Footer />
    </>
  );
};

export default ProfilePage;
