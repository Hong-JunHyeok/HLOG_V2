import React from 'react';
import styled from '@emotion/styled';
import LoginForm from '@/components/Auth/LoginForm';

import SEOHelmet from '@/components/Common/SEOHelmet';
import usePreventAuthrizedUser from '@/hooks/usePreventAuthrizedUser';

const StyledLoginPage = {
  Container: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    `,
};

export default function Login() {
  usePreventAuthrizedUser();
  return (
    <>
      <SEOHelmet
        title="HLOG | 로그인"
      />
      <StyledLoginPage.Container>
        <LoginForm />
      </StyledLoginPage.Container>
    </>
  );
}
