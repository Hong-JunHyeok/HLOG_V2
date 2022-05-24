import React from "react";
import Editor from "@/components/Post/Editor";
import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const WritePostPage = () => {
  return (
    <React.Fragment>
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
