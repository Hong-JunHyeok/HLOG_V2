import { Suspense } from 'react';
import PageLayout from '@/components/Common/PageLayout';
import SEOHelmet from '@/components/Common/SEOHelmet';
import HomeTab from '@/components/Common/HomeTab';
import PopularPostList from '@/components/Post/PostList/PopularPostList';
import { PostFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

const PopularPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 인기 게시글"
    />
    <PageLayout>
      <HomeTab />

      <Suspense fallback={<PostFallbackLoader />}>
        <PopularPostList />
      </Suspense>
    </PageLayout>
  </>
);

export default PopularPage;
