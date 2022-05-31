import { Suspense } from 'react';
import PostView from '@/components/Post/PostView';
import PageLayout from '@/components/Common/PageLayout';

const PostViewPage = () => (
  <PageLayout>
    <Suspense>
      <PostView />
    </Suspense>
  </PageLayout>
);

export default PostViewPage;
