import { Suspense, lazy } from 'react';

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from '@/components/Common/Header';
import HomeTab from '@/components/Common/HomeTab';
import Footer from '@/components/Common/Footer';
import SEOHelmet from '@/components/Common/SEOHelmet';

const RecentPostList = lazy(() => import('@/components/Post/PostList/RecentPostList'));

const RecentPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 최신 게시글"
    />
    <Header />
    <HomeTab />
    <Suspense fallback={<FallbackLoader />}>
      <ErrorBoundary fallback={<>error...</>}>
        <RecentPostList />
      </ErrorBoundary>
    </Suspense>
    <Footer />
  </>
);

export default RecentPage;
