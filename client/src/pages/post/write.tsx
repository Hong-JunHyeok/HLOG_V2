import styled from '@emotion/styled';
import { Suspense, useEffect } from 'react';
import Editor from '@/components/Post/Editor';
import ColorSet from '@/styles/colorSet';
import SEOHelmet from '@/components/Common/SEOHelmet';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import useScroller from '@/hooks/useScroller';
import CreatePostConfigure from '@/components/Post/CreatePostConfigure';
import Modal from '../../components/Modal/Modal';

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
  const { scrollTop } = useScroller();

  useEffect(() => {
    scrollTop();
  }, [scrollTop]);

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
      <Modal>
        <CreatePostConfigure />
      </Modal>
    </Suspense>
  );
};

export default WritePostPage;
