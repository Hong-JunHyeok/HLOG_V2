import { Suspense } from 'react';
import PostView from '@/components/Post/PostView';
import PageLayout from '@/components/Common/PageLayout';
import { PostViewFallbackLoader } from '@/components/Common/Loader/FallbackLoader';

const PostViewPage = () => (
  <>
    <PageLayout>
      <Suspense fallback={<PostViewFallbackLoader />}>
        <PostView />
      </Suspense>
    </PageLayout>
  </>
);
export default PostViewPage;
