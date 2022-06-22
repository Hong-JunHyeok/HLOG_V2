import styled from '@emotion/styled';
import { Suspense } from 'react';
import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import mediaQueryHelper from '@/styles/mediaHelper';
import ProfileForm from '@/components/Setting/ProfileForm';
import usePreventNormalUser from '@/hooks/usePreventNormalUser';

const StyledSettingPage = {
  SettingContainer: styled.main`
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

function SettingPage() {
  usePreventNormalUser();

  return (
    <>
      <Header />
      <StyledSettingPage.SettingContainer>
        <Suspense>
          <ProfileForm />
        </Suspense>
      </StyledSettingPage.SettingContainer>
      <Footer />
    </>
  );
}

export default SettingPage;
