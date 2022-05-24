import React from "react";
import LoginForm from "@/components/Auth/LoginForm";

import styled from '@emotion/styled';

export default function Login() {
	return (
		<React.Fragment>
      <StyledLoginPage.Container>
        <LoginForm />
      </StyledLoginPage.Container>
		</React.Fragment>
	);
}

const StyledLoginPage = {
  Container: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    `
}
