import { Suspense, lazy } from 'react';

import ErrorBoundary from '@/components/Common/ErrorBoundary';
import FallbackLoader from '@/components/Common/Loader/FallbackLoader';

import Header from '@/components/Common/Header';
import HomeTab from '@/components/Common/HomeTab';
import Footer from '@/components/Common/Footer';
import SEOHelmet from '@/components/Common/SEOHelmet';

const PopularPostList = lazy(() => import('@/components/Post/PostList/PopularPostList'));

const PopularPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 인기 게시글"
    />
    <Header />
    <HomeTab />
    <ErrorBoundary fallback={<>error...</>}>
      <Suspense fallback={<FallbackLoader />}>
        <ErrorBoundary fallback={<>Error</>}>
          <PopularPostList />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
    <Footer />
  </>
);

export default PopularPage;
