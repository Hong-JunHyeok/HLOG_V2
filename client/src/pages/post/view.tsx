import { Suspense } from 'react';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import PostView from '@/components/Post/PostView';

const PostViewPage = () => (
  <Suspense fallback={<>Error</>}>
    <Header />
    <PostView />
    <Footer />
  </Suspense>
);

export default PostViewPage;
