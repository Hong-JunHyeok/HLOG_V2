import { Suspense } from 'react';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import PostView from '@/components/Post/PostView';
import useMyInfo from '@/hooks/queries/useMyInfo';

const PostViewPage = () => {
  const { data } = useMyInfo();

  return (
    <>
      <Suspense>
        <Header user={data.user ? data.user : null} />
      </Suspense>
      <Suspense>
        <PostView />
      </Suspense>
      <Footer />
    </>
  );
};

export default PostViewPage;
