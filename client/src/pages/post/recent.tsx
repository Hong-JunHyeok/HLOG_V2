import { Suspense } from 'react';
import HomeTab from '@/components/Common/HomeTab';
import SEOHelmet from '@/components/Common/SEOHelmet';
import PageLayout from '@/components/Common/PageLayout';
import RecentPostList from '@/components/Post/PostList/RecentPostList';
import { PostFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

const RecentPage = () => (
  <>
    <SEOHelmet
      title="HLOG | 최신 게시글"
    />
    <PageLayout>
      <HomeTab />
      <Suspense fallback={<PostFallbackLoader />}>
        <RecentPostList />
      </Suspense>
    </PageLayout>
  </>
);

export default RecentPage;
