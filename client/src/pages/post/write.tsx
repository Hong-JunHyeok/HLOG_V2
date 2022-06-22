import styled from '@emotion/styled';
import { Suspense } from 'react';
import Editor from '@/components/Post/Editor';
import ColorSet from '@/styles/colorSet';
import SEOHelmet from '@/components/Common/SEOHelmet';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import useScrollEffect from '@/hooks/useScrollEffect';
import usePreventNormalUser from '@/hooks/usePreventNormalUser';

const StyledWritePostPage = {
  Container: styled.section`
    min-height: 100vh;
    overflow: hidden;
    background-color: ${ColorSet['--white']};
  `,
  EditorContainer: styled.main`
    height: 100%;
  `,
};

const WritePostPage = () => {
  useScrollEffect('TOP');
  usePreventNormalUser();

  return (
    <Suspense>
      <SEOHelmet
        title="HLOG | 글 작성"
      />
      <StyledWritePostPage.Container>
        <StyledWritePostPage.EditorContainer>
          <ErrorBoundary fallback={<>로딩중...</>}>
            <Editor />
          </ErrorBoundary>
        </StyledWritePostPage.EditorContainer>
      </StyledWritePostPage.Container>
    </Suspense>
  );
};

export default WritePostPage;
