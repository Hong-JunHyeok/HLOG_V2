import { lazy, Suspense } from 'react';
import PageLayout from '@/components/Common/PageLayout';
import ErrorBoundary from '@/components/Common/ErrorBoundary';
import SEOHelmet from '@/components/Common/SEOHelmet';
import HomeTab from '@/components/Common/HomeTab';
import PostListError from '@/components/Common/Error/PostListError';
import PostFallbackLoader from '@/components/Common/Loader/FallbackLoader';

const PopularPostList = lazy(() => import('@/components/Post/PostList/PopularPostList'));

const PopularPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 최신 게시글"
    />
    <PageLayout>
      <HomeTab />
      <ErrorBoundary fallback={<PostListError />}>
        <Suspense fallback={<PostFallbackLoader />}>
          <PopularPostList />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  </>
);

export default PopularPage;
