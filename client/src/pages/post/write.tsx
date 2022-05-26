import React from "react";
import Editor from "@/components/Post/Editor";
import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';
import SEOHelmet from "@/components/Common/SEOHelmet";

const WritePostPage = () => {
  return (
    <React.Fragment>
      <SEOHelmet
				title="HLOG | 글 작성"
			/>
      <StyledWritePostPage.Container>
        <StyledWritePostPage.EditorContainer>
          <Editor />
        </StyledWritePostPage.EditorContainer>
      </StyledWritePostPage.Container>
    </React.Fragment>
  );
}

export default WritePostPage;

const StyledWritePostPage = {
  Container: styled.section`
    min-height: 100vh;
    overflow: hidden;
    background-color: ${ColorSet['--white']};
  `,
  EditorContainer: styled.main`
    height: 100%;
  `
}
