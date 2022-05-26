import SEOHelmet from "@/components/Common/SEOHelmet";
import styled from "@emotion/styled";
import React from "react";
import JoinForm from "../../components/Auth/JoinForm";

export default function Join() {
	return (
		<React.Fragment>
      <SEOHelmet
				title="HLOG | 회원가입"
			/>
			<StyledJoinPage.Container>
      	<JoinForm />
			</StyledJoinPage.Container>
		</React.Fragment>
	);
}

const StyledJoinPage = {
  Container: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    `
}
