import React from "react";
import { useNavigate } from 'react-router-dom'
import Editor from "@/components/Post/Editor";
import styled from '@emotion/styled';
import ColorSet from '@/styles/colorSet';

const WritePostPage = () => {
  const navigate = useNavigate();

  const handleExit = () => navigate(-1);

  return (
    <React.Fragment>
      <StyledWritePostPage.Container>
        <StyledWritePostPage.Header>
          <button className="exit" onClick={handleExit}>나가기</button>

          <div className="utils">
            <button className="normal-button ">저장</button>
            <button className="normal-button post">포스트</button>
          </div>
        </StyledWritePostPage.Header>
        
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
  Header: styled.header`
    display: flex;
    height: 50px;
    background-color: ${ColorSet['--white']};
    border-bottom: 1px solid ${ColorSet['--greyOpacity200']};
    .exit {
      padding: 0 1rem;
      border-right: 1px solid ${ColorSet['--greyOpacity200']};
    }

    .utils {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: 1rem;

      .normal-button {
        border: 1px solid ${ColorSet['--greyOpacity300']};
        border-radius: 5px;
        margin-left: 0.8rem;
        padding: 0.5rem 1rem;
        background-color: ${ColorSet['--white']};
        &:hover {
          filter: brightness(80%);
        }
      }

      .post {
        background-color: ${ColorSet['--primary']};
        color: ${ColorSet['--white']};
        margin-left: 1rem;
      }
    }
  `,
  EditorContainer: styled.main`
    padding: 1rem;
    margin: 0 auto;
    max-width: 1000px;
    height: 100%;
  `
}
