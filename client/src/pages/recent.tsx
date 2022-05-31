import { Suspense, lazy } from 'react';

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import { PostFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

import HomeTab from '@/components/Common/HomeTab';
import SEOHelmet from '@/components/Common/SEOHelmet';
import PageLayout from '@/components/Common/PageLayout';
import PostListError from '@/components/Common/Error/PostListError';

const RecentPostList = lazy(() => import('@/components/Post/PostList/RecentPostList'));

const RecentPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 최신 게시글"
    />
    <PageLayout>
      <HomeTab />
      <ErrorBoundary fallback={<PostListError />}>
        <Suspense fallback={<PostFallbackLoader />}>
          <RecentPostList />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  </>
);

export default RecentPage;
