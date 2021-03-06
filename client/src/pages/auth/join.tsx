import React from 'react';
import styled from '@emotion/styled';
import SEOHelmet from '@/components/Common/SEOHelmet';
import JoinForm from '../../components/Auth/JoinForm';
import usePreventAuthrizedUser from '@/hooks/usePreventAuthrizedUser';

const StyledJoinPage = {
  Container: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    `,
};

export default function Join() {
  usePreventAuthrizedUser();
  return (
    <>
      <SEOHelmet
        title="HLOG | 회원가입"
      />
      <StyledJoinPage.Container>
        <JoinForm />
      </StyledJoinPage.Container>
    </>
  );
}
